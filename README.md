# Yaqi Hou — personal website

This website is plain HTML, CSS, and JavaScript. The checked-in pages are the
site itself: no build step, static site generator, templates, Ruby, Sass, or
package installation is required.

## Edit

- `index.html`: homepage.
- `aboutme.html`, `professional.html`, `research.html`, `publications.html`: detail pages.
- `assets/css/style.css`: light/dark tokens, typography, layouts, and responsive styles.
- `assets/js/navigation.js`: navigation, theme switching, and native disclosure helpers.
- `assets/js/field.js`: homepage-only thread animation and spring interaction.
- `assets/js/theme.js`: applies the saved theme before the first paint.
- `assets/fonts/`: self-hosted Afacad and Public Sans, with licenses under `licenses/`.
- `assets/img/`, `assets/images/`, and `CV/`: images and downloadable CVs.
- `404.html`: custom error page.
- `feed.xml` and `jekyll/update/2020/02/19/welcome-to-jekyll.html`: preserved historical feed and post.

Each page contains its complete markup, including navigation and footer. Edit
those shared sections in each page when needed. Content and native disclosures remain usable without
JavaScript. Fonts are served locally. The existing MathJax CDN remains an external
resource on the research and publications pages.
The copyright year is now explicit HTML; update it when needed.

The directories `aboutme/`, `professional/`, `research/`, and `publications/`
contain small redirects to their `.html` pages. They preserve extensionless URLs
on ordinary static hosts; JavaScript redirects also carry query strings and
fragments. With JavaScript disabled, the HTML refresh still opens the page.

## Preview and check

From this directory, with Python 3 available through `uv`:

```sh
uv run --no-project python scripts/preview.py
uv run --no-project python scripts/check_site.py
```

Open `http://127.0.0.1:8000/`. Use `--port 8080` to choose another port.
The command stays in the foreground of the terminal where you run it; press
Ctrl-C to stop. A preview launched by a coding tool runs in that tool's process
session instead of opening a terminal window. `--port 0` selects an available
port and prints its URL. This local preview is separate from the public site.
The preview copies public files into a temporary directory and serves that copy;
it does not render or compile anything. Restart it after edits. Repository files,
local notes, and unpublished CV variants are excluded. The temporary copy is
removed when the server stops. No Python packages are needed.

## Publish

GitHub Pages publishes these files directly from the repository root. The live
repository settings were verified through the GitHub API on September 15, 2026:

- Source: **Deploy from a branch**, **master**, **/ (root)**.
- Custom domain: **yaqihou.com**.
- **Enforce HTTPS**: enabled.

The empty root `.nojekyll` disables Jekyll; `CNAME` retains `yaqihou.com`.
Keep both files at the publishing root alongside `index.html` and `404.html`.
No custom build workflow or Python runtime is needed on GitHub Pages. See
[GitHub's static-file publishing documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

To deploy, commit the migrated pages, assets, redirect directories, `.nojekyll`,
and removal of the former build sources, then push to `master`. Local untracked
files are not deployed until committed and pushed. Review the selected files:
the preview's public-file allowlist only controls the local preview, not GitHub
Pages. Any additional files committed to the publishing source may be public.
After the Pages deployment succeeds, check the live homepage, extensionless
links, CV downloads, and a missing URL for the custom 404.

For another static host, upload the public pages, redirect directories, `assets/`,
the published CVs, `feed.xml`, and `404.html`. Configure the host to use `404.html`
for missing paths. The site expects to be hosted at the domain root.

## Migration notes

The current Jekyll sources were rendered once to preserve their content and
styles. The resulting HTML and CSS are now the editable source of truth.
The later redesign replaces the former theme's CSS with a custom design. Original
image assets and their CC0 license remain in the repository. Historical blog text mentioning Jekyll is content,
not a build dependency. The obsolete “Powered by Jekyll” footer credit was removed.

Navigation links in the legacy post/error page now use absolute site paths.
Feed and legacy SEO URLs include the custom domain's HTTPS scheme. The favicon now uses the site's `yh` monogram.
The original Markdown, layouts, and build configuration remain in Git history.

## Design and behavior

Light is the default, even if the operating system prefers dark. The theme button
saves an explicit preference in local storage and reuses it on every page. When
storage is unavailable the switch still works for the current page. Supported
browsers cross-fade the page with a small vertical transition; other browsers
transition colors. Reduced-motion preferences remove both effects.

The homepage’s canvas is an abstract field study inspired by overlapping curves
and interference, not a physical simulation or a research result. The composition
moves gently on its own. A compact cursor contact pushes flexible thread segments; connected, damped
springs carry the bend and momentum along each strand before it settles. The canvas itself does not move.
Drawing continues when focus changes and stops while the artwork is offscreen.
Browsers may throttle hidden tabs; ambient motion follows elapsed time on return.
Reduced-motion visitors get a static composition. The artwork is hidden at widths
of 900px or less and for touch-only/coarse-pointer devices, with its canvas backing
surface released. The artwork has no caption or pause label.

Same-origin page navigation uses a short native cross-fade in supporting browsers;
ordinary navigation remains the fallback. Reduced motion disables the page fade.
Links have small directional-arrow and underline feedback. Detail-page headings
have a short rule accent; they remain ordinary headings rather than controls.

Detail pages have a table of contents and native `details` elements. The research
and professional pages also have an expand/collapse-all control. The full original
work examples and technical skills remain in the HTML; no client-side fetching or
template rendering is used. The Work page opens with dated career milestones and
maps tools to applications without requiring expansion. Its optional disclosures
hold the longer examples. The Research page has a conceptual methods diagram;
all publication and presentation entries are maintained only in `publications.html`.
The old Research publication/presentation anchors retain links to that page.

Career dates and titles were checked against the LinkedIn profile on September 15,
2026. The user confirmed that the SAVP role ran January–September 2026. The current
role is Lead Quantitative Analytics Specialist, VP, from September 2026. Keep the
homepage, About page, and career timeline in sync when changing the current role.
The downloadable PDFs are separate documents and were not revised in this update.

The Connect email is intentionally plain text, `yaqi.hou at yahoo.com`, with no
`mailto:` target. Do not reintroduce the literal address in hidden attributes.

`PRODUCT.md` records the brief. `DESIGN.md` records the implemented visual system.
Development review artifacts under `.impeccable/` are local working material and
are not part of the public preview.
