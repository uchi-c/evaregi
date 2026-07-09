# Evaregi — Corporate Website

A premium, static multi-page marketing website for **Evaregi**, a prefabricated
and modular building solutions company serving the mining, construction,
government, education, commercial and accommodation sectors.

Built as a polished corporate site (not a digital copy of the company PDF) that
works as a real marketing asset.

## Tech stack

- **HTML5** — hand-authored, semantic, SEO-friendly markup
- **Tailwind CSS** (Play CDN) with a custom brand theme
- **Custom CSS** (`css/styles.css`) for components, animations and the design system
- **Vanilla JavaScript** (`js/main.js`) — no framework, no build step
- **AOS** — scroll reveal animations
- **Swiper.js** — testimonial & project carousels
- **Font Awesome 6** — icons
- **Google Fonts** — Poppins

No backend and no build tooling are required — it's a fully static site.

## Design direction

| Token       | Value      |
|-------------|------------|
| Primary     | Deep Red `#B71C1C` |
| Secondary   | Navy Blue `#0B1F3A` |
| Background  | White |
| Accent      | Light Gray `#F3F4F6` |
| Font        | Poppins |

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, highlights, sectors, why-choose, stats, testimonials, client logos, contact banner |
| `about.html` | Story, mission, vision, values, timeline, leadership, why modular |
| `services.html` | 10 service cards, process, FAQ |
| `industries.html` | Dedicated sections for the 6 sectors with benefits |
| `products.html` | Standard 3×6 unit, custom buildings, office units, accommodation, classrooms, multi-storey |
| `projects.html` | Project cards, before/after slider, lightbox gallery |
| `certifications.html` | Company, Tax, NCC registrations & Tax Clearance with downloads |
| `contact.html` | Contact info, quote form, Google Map, WhatsApp, FAQ |
| `404.html` | Friendly not-found page |

## Premium features included

Sticky navigation · animated statistics · smooth scrolling · lightbox gallery ·
before/after slider · FAQ accordion · floating WhatsApp button · quote request
form · scroll animations · mobile responsive · SEO meta + `sitemap.xml` /
`robots.txt` · professional footer · back-to-top button.

## Running locally

It's static — just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploying

Deploy the repository root to any static host (Vercel, Netlify, GitHub Pages,
Cloudflare Pages). No configuration or build command is needed — set the output
/ publish directory to the project root.

## ⚠️ Placeholders to replace before going live

This site is fully functional but uses clearly-marked placeholder content so it
can be populated with Evaregi's real material:

- **Contact details** — phone `+260 97 000 0000`, `info@evaregi.com`, and the
  Lusaka address appear in every page footer, the contact page, the WhatsApp
  links (`wa.me/260970000000`) and `tel:` links. Search-and-replace these.
- **Images** — hero and section imagery uses Unsplash placeholders. Swap for
  Evaregi's own project photos (drop them in `assets/img/` and update the
  `src` / `data-lightbox` URLs).
- **Certificates** — `assets/certs/*.pdf` are generated placeholders. Replace
  with the official scanned documents.
- **Client logos** — the marquee on the home page uses placeholder names.
- **Leadership** — the About page team cards are placeholders.
- **Domain** — canonical URLs, `sitemap.xml` and `robots.txt` assume
  `https://www.evaregi.com/`. Update to the real domain.
- **Contact form** — front-end only; wire it to an email service
  (e.g. Formspree, Web3Forms) or your own backend to receive submissions.

## Structure

```
.
├── index.html
├── about.html
├── services.html
├── industries.html
├── products.html
├── projects.html
├── certifications.html
├── contact.html
├── 404.html
├── css/styles.css
├── js/main.js
├── assets/
│   ├── favicon.svg
│   ├── logo.svg
│   ├── logo-white.svg
│   ├── img/
│   └── certs/*.pdf
├── robots.txt
└── sitemap.xml
```
