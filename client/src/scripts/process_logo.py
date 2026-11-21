"""
Process logo-indiefit.jpg → client/public/assets/logo-indiefit.png
Strategy: 
  - Remove near-white/light background (make it transparent)
  - Leave text/dark pixels intact 
  - Recolor near-white remaining pixels to Moonlit Silver (#EEF2F7) 
    so the logo reads cleanly on the #111317 Charcoal Grey navbar
"""
from PIL import Image
import sys, os

SRC = r"c:\Users\Airdit\Desktop\IndieFit\logo-indiefit.jpg"
DST = r"c:\Users\Airdit\Desktop\IndieFit\client\public\assets\logo-indiefit.png"

img = Image.open(SRC).convert("RGBA")
data = img.getdata()

# Moonlit Silver for text pixels
SILVER = (238, 242, 247)

new_data = []
for r, g, b, a in data:
    brightness = (r + g + b) / 3
    # Very light pixels (background) → transparent
    if brightness > 220 and abs(r - g) < 20 and abs(g - b) < 20:
        new_data.append((0, 0, 0, 0))
    # Mid-light pixels → Moonlit Silver (blends on dark bg)
    elif brightness > 160:
        # Blend toward silver
        ratio = (brightness - 160) / 60  # 0 at 160, 1 at 220
        nr = int(r * (1 - ratio) + SILVER[0] * ratio)
        ng = int(g * (1 - ratio) + SILVER[1] * ratio)
        nb = int(b * (1 - ratio) + SILVER[2] * ratio)
        new_data.append((nr, ng, nb, 255))
    # Dark pixels (text, marks) → Moonlit Silver
    elif brightness < 80:
        new_data.append((SILVER[0], SILVER[1], SILVER[2], 255))
    else:
        new_data.append((r, g, b, a))

img.putdata(new_data)
os.makedirs(os.path.dirname(DST), exist_ok=True)
img.save(DST, "PNG")
print(f"Saved: {DST} ({img.size[0]}x{img.size[1]})")
