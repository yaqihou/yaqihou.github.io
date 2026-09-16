"""Preview the public files without exposing the rest of the workspace."""

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import shutil
from tempfile import TemporaryDirectory

ROOT = Path(__file__).resolve().parents[1]
PAGES = (
    "index.html", "aboutme.html", "professional.html", "research.html",
    "publications.html", "404.html",
    "jekyll/update/2020/02/19/welcome-to-jekyll.html",
)
ALIASES = tuple(f"{name}/index.html" for name in (
    "aboutme", "professional", "research", "publications",
))
PUBLIC_FILES = PAGES + ALIASES + (
    "feed.xml", "CNAME", ".nojekyll", "assets/css/style.css",
    "assets/js/navigation.js", "assets/js/theme.js", "CV/Yaqi-Hou-CV-Academia.pdf",
    "CV/Yaqi-Hou-CV-Industry.pdf", "licenses/slate-CC0.txt",
    "licenses/afacad-OFL.txt", "licenses/publicsans-OFL.txt",
)


def copy_public_files(destination):
    for relative in PUBLIC_FILES:
        target = destination / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / relative, target)
    for folder in ("assets/img", "assets/images", "assets/fonts"):
        shutil.copytree(ROOT / folder, destination / folder)


class Handler(SimpleHTTPRequestHandler):
    def send_error(self, code, message=None, explain=None):
        if code != 404:
            return super().send_error(code, message, explain)
        body = (Path(self.directory) / "404.html").read_bytes()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    with TemporaryDirectory(prefix="yaqihou-preview-") as directory:
        copy_public_files(Path(directory))
        handler = partial(Handler, directory=directory)
        with ThreadingHTTPServer(("127.0.0.1", args.port), handler) as server:
            print(f"Preview: http://127.0.0.1:{server.server_port}/", flush=True)
            print("Restart this command after editing files. Ctrl-C to stop.", flush=True)
            try:
                server.serve_forever()
            except KeyboardInterrupt:
                pass


if __name__ == "__main__":
    main()
