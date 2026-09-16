"""Check public routes, local links/assets, the feed, and optional migration parity."""

import argparse
from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET

from preview import ALIASES, PAGES, PUBLIC_FILES, ROOT


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.links = []
        self.ids = set()
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.add(attrs["id"])
        for attr in ("href", "src"):
            if attrs.get(attr):
                self.links.append(attrs[attr])


def resolve(url):
    path = ROOT / unquote(urlsplit(url).path).lstrip("/")
    if path.is_dir():
        path = path / "index.html"
    return path


def content(source):
    match = re.search(r'<main\b.*?</main>', source, re.S)
    if not match:
        match = re.search(r'<section id="main_content".*?</section>', source, re.S)
    return "\n".join(line.rstrip() for line in match.group(0).splitlines()) if match else None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--baseline", type=Path, help="Optional fresh pre-migration Jekyll output")
    args = parser.parse_args()
    errors = []
    marker = ROOT / ".nojekyll"
    if not marker.is_file() or marker.read_bytes() != b"":
        errors.append("GitHub Pages requires the empty root .nojekyll marker for this site.")
    if (ROOT / "CNAME").read_text().strip() != "yaqihou.com":
        errors.append("CNAME does not match the configured GitHub Pages domain: yaqihou.com")
    pages = {name: Page((ROOT / name).read_text()) for name in PAGES + ALIASES}
    for name in PUBLIC_FILES:
        if not (ROOT / name).is_file():
            errors.append(f"Missing public file: {name}")
    for name, page in pages.items():
        source = (ROOT / name).read_text()
        if re.search(r'\{%|\{\{|\A---\s*\n', source):
            errors.append(f"Unrendered template/front matter: {name}")
        for link in page.links:
            url = urlsplit(urljoin("/" + name, link))
            if url.scheme or url.netloc:
                continue
            target = resolve(url.path)
            if not target.is_file():
                errors.append(f"{name}: missing target {link}")
                continue
            relative = target.relative_to(ROOT).as_posix()
            if relative in ALIASES:
                relative = relative.split("/")[0] + ".html"
            if url.fragment and relative in pages and unquote(url.fragment) not in pages[relative].ids:
                errors.append(f"{name}: missing anchor {link}")
    css = (ROOT / "assets/css/style.css").read_text()
    for asset in re.findall(r'url\([\'\"]?([^\)\'\"]+)', css):
        if not urlsplit(asset).scheme and not resolve(urljoin("/assets/css/style.css", asset)).is_file():
            errors.append(f"CSS: missing asset {asset}")
    feed = ET.parse(ROOT / "feed.xml")
    ns = {"a": "http://www.w3.org/2005/Atom"}
    for link in feed.findall(".//a:link", ns):
        href = link.attrib["href"]
        if not href.startswith("https://yaqihou.com/") or not resolve(href).is_file():
            errors.append(f"Invalid feed link: {href}")
    for name in ("Gemfile", "Gemfile.lock", "_config.yml", "_layouts", "_includes", "_posts", "_data", "assets/css/style.scss"):
        if (ROOT / name).exists():
            errors.append(f"Obsolete build source remains: {name}")
    if args.baseline:
        for name in PAGES:
            before = content((args.baseline / name).read_text())
            after = content((ROOT / name).read_text())
            if before is None or before != after:
                errors.append(f"Page content differs from baseline: {name}")
        for name in ("assets/css/style.css", "CV/Yaqi-Hou-CV-Academia.pdf", "CV/Yaqi-Hou-CV-Industry.pdf"):
            if (ROOT / name).read_bytes() != (args.baseline / name).read_bytes():
                errors.append(f"Asset differs from baseline: {name}")
        for directory in ("assets/img", "assets/images"):
            for path in (args.baseline / directory).iterdir():
                if path.read_bytes() != (ROOT / directory / path.name).read_bytes():
                    errors.append(f"Image differs from baseline: {path.name}")
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"PASS: {len(PAGES)} pages, {len(ALIASES)} aliases, local links/anchors, CSS assets, feed, and build removal.")
    if args.baseline:
        print("PASS: seven page content regions match the baseline (ignoring trailing whitespace); CSS, published CVs, and original images match byte for byte.")


if __name__ == "__main__":
    main()
