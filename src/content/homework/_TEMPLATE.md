---
# HOW TO USE: copy this file, rename it (e.g. 03-colour-analysis.md), fill it in.
# Files starting with "_" are ignored by the site. Put photos in src/assets/homework/<folder>/.
# Every section below is optional — delete what you don't need. Sections are numbered automatically.

title: The everyday wardrobe        # big title (a full stop is added for you)
module: wardrobe analysis           # shows as "HOMEWORK 03 / WARDROBE ANALYSIS"
date: 2026-11-17
summary: One sentence under the title.
draft: true                         # delete this line to publish

# Home page + homework list: up to 3 photos, pinned together with safety pins.
sheets:
  - image: ../../assets/homework/03/piece-1.jpg
  - image: ../../assets/homework/03/look.jpg
    fit: cover                      # "cover" fills the sheet; default "contain" shows the whole item
  - image: ../../assets/homework/03/piece-2.jpg

# Intro rows on the right.
meta:
  - { k: focus, v: 'Proportion, palette, versatility' }
  - { k: format, v: Wardrobe breakdown }
  - { k: status, v: In progress }

# 01 / THE STARTING POINT — big portrait + up to 3 side sheets + palette.
start:
  portrait: ../../assets/homework/03/portrait.jpg
  caption: ['structured + soft.', 'the contrast is the starting point.']
  pieces:
    - image: ../../assets/homework/03/piece-1.jpg
      label: [black, leather loafers]     # each item = one line
      note: a grounded base               # optional second line, after a gap
    - image: ../../assets/homework/03/piece-2.jpg
      label: [cocoa, fine wool knit]
    - image: ../../assets/homework/03/texture.jpg
      label: [wool + cotton]
      note: texture study
      matte: true                         # photo inside a paper border (for textures/close-ups)
  palette:
    - { name: charcoal, hex: '#333636' }
    - { name: cocoa, hex: '#664a38' }

# 02 / WHAT I NOTICE — a headline + up to 3 points.
notice:
  headline: The pieces are there. The balance is the work.
  points:
    - { label: proportion, title: Give volume a purpose., body: Short paragraph. }
    - { label: palette, title: Let texture do the talking., body: Short paragraph. }
    - { label: versatility, title: Style before adding., body: Short paragraph. }

# 03 / PUTTING IT TOGETHER — up to 2 outfit prints, each with an optional small piece sheet.
outfits:
  headline: Same foundation. A different feeling.
  items:
    - image: ../../assets/homework/03/outfit-1.jpg
      caption: look 01 / a little more structure
      formula: blazer + ivory base + wide-leg trousers
      body: One sentence about the look.
      piece:
        image: ../../assets/homework/03/blazer.jpg
        label: [charcoal, wool blazer]
        note: relaxed tailoring
    - image: ../../assets/homework/03/outfit-2.jpg
      caption: look 02 / a softer everyday
      formula: cocoa knit + ivory trousers + black loafers
      body: One sentence about the look.

# 04 / REFLECTION
reflection:
  headline: ['a wardrobe,', 'not a shopping list.']
  body: What you learned and what you'd do next.
---

Anything written down here (below the dashes) appears as extra text after section 03.
