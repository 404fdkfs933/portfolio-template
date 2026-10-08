#!/usr/bin/env python3
"""Generate placeholder artwork for the three sample projects.

These are abstract compositions drawn by code, so the template can be run and
looked at before any real work goes in. Replace them with your own images and
delete this script, or keep it around for a fresh set: `npm run samples`.

Needs Pillow:  python3 -m pip install pillow
"""
from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent / "public" / "art"

# slug -> (palette, list of (w, h)) ; sizes mix portrait, landscape and square
PROJECTS = {
    "ink-studies": (["#0e263a", "#41525f", "#f3efe6", "#a8843d"], [(1200, 1600), (1600, 1200), (1400, 1400), (1200, 1600), (1600, 1100), (1300, 1600)]),
    "night-series": (["#0a1420", "#16345a", "#c79c4c", "#eee9df"], [(1600, 1000), (1600, 1000), (1100, 1600), (1600, 1000), (1400, 1400)]),
    "field-colour": (["#f3efe6", "#d9b56a", "#2f6fb5", "#b23b33", "#1f7a55"], [(1600, 1200), (1200, 1600), (1600, 1200), (1500, 1500)]),
}


def grain(img: Image.Image, amount: int = 14) -> Image.Image:
    noise = Image.effect_noise(img.size, amount).convert("L")
    return Image.composite(img, Image.blend(img, Image.new("RGB", img.size, "#808080"), 0.5), noise.point(lambda v: 255 - abs(v - 128)))


def compose(w: int, h: int, palette: list[str], seed: int) -> Image.Image:
    rnd = random.Random(seed)
    img = Image.new("RGB", (w, h), palette[0])
    d = ImageDraw.Draw(img)
    # soft background field
    for _ in range(3):
        blob = Image.new("RGB", (w, h), palette[0])
        bd = ImageDraw.Draw(blob)
        cx, cy = rnd.randint(0, w), rnd.randint(0, h)
        r = rnd.randint(min(w, h) // 3, min(w, h))
        bd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=rnd.choice(palette[1:]))
        blob = blob.filter(ImageFilter.GaussianBlur(min(w, h) // 6))
        img = Image.blend(img, blob, 0.45)
        d = ImageDraw.Draw(img)
    # hard shapes on top
    for _ in range(rnd.randint(3, 7)):
        kind = rnd.choice(["bar", "disc", "arc", "line"])
        col = rnd.choice(palette[1:])
        if kind == "bar":
            x = rnd.randint(0, w)
            d.rectangle([x, 0, x + rnd.randint(w // 40, w // 8), h], fill=col)
        elif kind == "disc":
            r = rnd.randint(min(w, h) // 12, min(w, h) // 4)
            cx, cy = rnd.randint(r, w - r), rnd.randint(r, h - r)
            d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)
        elif kind == "arc":
            r = rnd.randint(min(w, h) // 6, min(w, h) // 2)
            cx, cy = rnd.randint(0, w), rnd.randint(0, h)
            a = rnd.randint(0, 360)
            d.arc([cx - r, cy - r, cx + r, cy + r], a, a + rnd.randint(60, 240), fill=col, width=rnd.randint(w // 80, w // 25))
        else:
            ang = rnd.uniform(0, math.pi)
            L = max(w, h) * 1.5
            cx, cy = rnd.randint(0, w), rnd.randint(0, h)
            d.line([(cx - L * math.cos(ang), cy - L * math.sin(ang)), (cx + L * math.cos(ang), cy + L * math.sin(ang))], fill=col, width=rnd.randint(3, w // 120))
    img = grain(img)
    # a quiet mark so nobody mistakes these for real work
    d = ImageDraw.Draw(img)
    d.text((24, h - 36), "sample image · replace me", fill=palette[-1])
    return img


def portrait(w: int = 1800, h: int = 2200) -> Image.Image:
    """A stand-in for the photo of you on the home and About pages: a soft grey studio wall."""
    img = Image.new("RGB", (w, h), "#ededed")
    d = ImageDraw.Draw(img)
    for y in range(h):
        t = y / h
        g = int(236 - 26 * t)
        d.line([(0, y), (w, y)], fill=(g, g, g))
    # a soft pool of light where a person would stand
    light = Image.new("L", (w, h), 0)
    ImageDraw.Draw(light).ellipse([w * 0.2, h * 0.08, w * 0.8, h * 0.75], fill=90)
    light = light.filter(ImageFilter.GaussianBlur(w // 8))
    img = Image.composite(Image.new("RGB", (w, h), "#fafafa"), img, light)
    d = ImageDraw.Draw(img)
    d.text((40, h - 60), "portrait · replace public/portrait.jpg with a photo of you", fill="#8a8a8a")
    return img


def main() -> None:
    path = ROOT.parent / "portrait.jpg"
    portrait().save(path, "JPEG", quality=86, optimize=True, progressive=True)
    print(f"{path.relative_to(ROOT.parent.parent)}  {path.stat().st_size // 1024} KB")
    for slug, (palette, sizes) in PROJECTS.items():
        out = ROOT / slug
        out.mkdir(parents=True, exist_ok=True)
        for i, (w, h) in enumerate(sizes, 1):
            img = compose(w, h, palette, seed=hash((slug, i)) & 0xFFFF)
            path = out / f"{i:02d}.jpg"
            img.save(path, "JPEG", quality=86, optimize=True, progressive=True)
            print(f"{path.relative_to(ROOT.parent.parent)}  {w}x{h}  {path.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
