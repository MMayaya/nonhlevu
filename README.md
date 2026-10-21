# Nonhlevu Secondary School

This folder is the GitHub-ready website. Open `index.html` to start. Each section is a separate HTML document, containing its own content, metadata, header and footer. No build, installation, framework or hosting-specific service is required.

## Website files to keep

| File | Purpose |
| --- | --- |
| `index.html` | Home |
| `about.html` | Our school |
| `academics.html` | Academics |
| `admissions.html` | Admissions and FAQs |
| `school-life.html` | School life and gallery placeholders |
| `news.html` | Notices and calendar |
| `resources.html` | Parent and learner resource centre |
| `contact.html` | Contact details and email composer |
| `privacy.html` | Privacy and accessibility |
| `styles.css` | Shared styling, responsive layouts and animations |
| `app.js` | Shared interactive enhancements; no page routing |
| `assets/school-crest.png` | School crest used by the site |
| `MediaFiles/DroneImage.png` | Homepage hero background; keep the `MediaFiles` folder when publishing |
| `downloads/nonhlevu-admissions-guide.txt` | Downloadable preparation checklist |
| `downloads/nonhlevu-study-guide.txt` | Downloadable study planner |
| `.nojekyll` | Serve the files directly on GitHub Pages |
| `README.md` | These maintenance notes; optional for serving the site |

Upload the contents of this folder to the publishing root of your GitHub repository, including the `assets`, `MediaFiles` and `downloads` subfolders. The HTML pages belong at the same level as `styles.css` and `app.js`. All internal URLs are relative, so a repository subpath is supported.

## Edit the website

- Edit a page's content directly in its matching HTML file.
- Update navigation or footer markup across all nine HTML files when changing shared links or branding.
- Edit colours, layout and animations in `styles.css`.
- Edit calendar, search, filters and email behaviour in `app.js`.
- Add resource rows directly in `resources.html`; the search script reads those rows. Use `data-category="Parents"`, `"Learners"`, `"Admissions"` or `"Everyone"`.
- Add approved files to `downloads/`, then link to them in the relevant page.
- Add future school photos to `MediaFiles/` and give them descriptive file names. Use web-sized JPEG or WebP files for large photographs when possible, and keep the filename's capitalisation exactly the same in HTML and on disk.
- Add school notices directly in `news.html`, matching a filter's `data-category`.
- When updating contact information, check `contact.html`, `admissions.html`, the footer of each page and the admissions checklist.

Normal links, browser Back/Forward, opening a page in a new tab and direct page URLs work without a JavaScript router. Core page content and downloads are available without JavaScript. JavaScript adds mobile-menu behaviour, resource filtering, calendar browsing and email draft preparation. The calendar still has no confirmed events; do not infer school dates from it.

The form prepares an email in the visitor's own email app; it is not a backend delivery service. Applications are not submitted through this website. Unknown facts and proposed school wording remain marked for review.

## Previous versions no longer used

The new root-level website does not reference any of the following:

- `school-site/` — original single-page source, its nested Git history and Sites configuration. Archive it if you want to retain that older development history; otherwise it is not needed for GitHub Pages.
- `Nonhlevu-Website/` — extracted copy of the original single-page ZIP.
- `Nonhlevu-Website.zip` — old ZIP download.

These were left untouched for you to remove when satisfied. The original `Nonhlevu.png` is not used at runtime because the site uses `assets/school-crest.png`; keep the original as your source artwork if desired. `gitattributes` is an existing unrelated file and was not changed.

The earlier privately hosted Sites preview is a separate older publication. This repository contains the GitHub Pages version. To publish the root-level website after a push, set **Settings → Pages → Build and deployment** to **Deploy from a branch**, **main**, **/(root)**. GitHub Pages deployment status appears in the repository's Actions tab; the wording in this README does not control deployment.
