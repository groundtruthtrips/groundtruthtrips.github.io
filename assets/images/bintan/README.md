# Images for Bintan 2026

Referenced from `_editions/bintan-2026.md` front matter.

- `photos/` — the organizer's own photos, resized to 1600px wide (2400px for
  `main-background.jpg`, the hero) with all metadata, including GPS, stripped.
  Used for the hero, the activity cards and the gallery carousel.
- `fireflies.jpg`, `tanjung-pinang.jpg` — third-party images; the Tanjung
  Pinang credit and licence are in the gallery entry.

To add a photo, resize and strip metadata before committing, e.g.:

    convert original.jpg -auto-orient -resize 1600x -strip -quality 80 photos/name.jpg
