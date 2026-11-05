# Ground Truth

Website for **Ground Truth**, a recurring program in which computer
science students travel to biodiversity and conservation sites, learn from
local practitioners, and build technology for real conservation challenges.
Ground Truth is a new land-based trip format offered under the
[CCSGP](https://www.ccsgp.comp.nus.edu.sg/) Study Trip Programme at the
NUS School of Computing.

Built with [Jekyll](https://jekyllrb.com/), plain SCSS, and no frontend
framework. Client-side JavaScript is limited to small progressive
enhancements: the gallery carousel (`assets/js/carousel.js`) and the latest
iNaturalist Bioblitz observations (`assets/js/inaturalist.js`, loaded from
the public iNaturalist API). The mobile menu is CSS-only.

## Running locally

Requires Ruby and Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

To also see draft-like changes rebuild automatically, `jekyll serve` already
watches files by default. Use `bundle exec jekyll build` for a one-off,
production-style build into `_site/`.

## Adding a new trip

Every trip ("edition") is one Markdown file in the `_editions` collection.
Add a new file such as:

```
_editions/sabah-2027.md
```

with front matter like:

```yaml
---
title: "Sabah 2027"
location: "Sabah, Malaysia"
start_date: 2027-06-01
end_date: 2027-06-12
year: 2027
status: "upcoming"          # upcoming | ongoing | completed
summary: "One or two sentences describing this edition."
intro: "A short paragraph shown at the top of the edition page."
hero_image: ""               # /assets/images/sabah/hero.jpg, or leave blank for a placeholder
map_url: ""
featured: false

organizer:
  name: "Organizer name"
  affiliation: "National University of Singapore, School of Computing"
  photo: ""                  # /assets/images/people/name.jpg, or leave blank

local_partners:
  - name: "Partner organization name"
    description: "One line describing the partnership."
    logo: ""                 # /assets/images/partners/name-logo.png, or leave blank
    link:
      label: "Link label"
      url: ""

activities:
  - name: "Example activity"
---

Short "About" paragraph for this edition.
```

That's it — the new edition automatically appears as a card on the homepage
(sorted by `start_date`) and gets its own page at `/trips/sabah-2027/`.
No other file needs to change.

Set `featured: true` on at most one edition to control which one the
homepage's "Explore …" button points to; if none is featured, the most
recent edition is used.

### Images

Place images for an edition under `assets/images/<edition-slug>/`, e.g.
`assets/images/sabah-2027/hero.jpg`, and reference them from the front
matter (`hero_image`, or `image:` on individual `activities` entries). Any
image field left blank falls back to a gradient placeholder, so the page
still looks complete before real photos are available.

## Editing a trip

Almost everything about an edition — dates, status, partners, activities,
and the intro/about text — lives in that edition's single Markdown file
under `_editions/`. You should rarely need to touch the `_layouts/edition.html`
template; it renders whatever front matter is present and hides sections
that have no data (e.g. the Partners section only appears if `local_partners`
is set; `organizer` is credited separately in the About section rather
than listed as a partner).

Optional fields you can add to any edition as they become relevant:
`students_count`, `application_link`, `contact`, `gallery`, `reports`,
`github_repos`, `projects`. See the commented-out examples in
`_editions/bintan-2026.md` for the expected shape of each.

## Deployment (GitHub Pages)

This site only uses plugins on GitHub Pages' supported list
(`jekyll-seo-tag`, `jekyll-sitemap`), so the simplest setup is:

1. Push this repository to GitHub.
2. In the repo's **Settings → Pages**, set the source to the branch you
   deploy from (e.g. `main`) and the root folder.
3. GitHub builds and publishes the site automatically on every push.

Before going live, update `url` (and `baseurl` if served from a subpath)
in `_config.yml` so canonical URLs and Open Graph tags resolve correctly.

### Deploying under a subpath

`_config.yml` is currently set for `https://manuelrigger.at/bintan` —
`url: "https://manuelrigger.at"` and `baseurl: "/bintan"`. Every internal
link, asset path, and the sitemap already go through Jekyll's
`relative_url`/`absolute_url` filters, so `bundle exec jekyll build`
produces a `_site/` ready to be placed at that path (e.g. as a `bintan/`
directory in the target site's repo). If you move it elsewhere later,
just update those two values and rebuild — no template changes needed.

## Project structure

```
_config.yml          Site configuration, collection setup
_layouts/             default.html, page.html, home.html, edition.html
_includes/             header.html, footer.html, edition-card.html, head.html
_editions/            One Markdown file per trip (the collection)
assets/css/main.scss  Design tokens (CSS custom properties) + all styles
assets/images/        One folder per edition for its photos
index.md               Homepage
about.md               About page
```
