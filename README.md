# Genshin Impact Pity Calculator

## Usage ([Try on GitHub Pages!](https://forkpoweroutlet.github.io/genshin-pity-calculator/))
![Usage GIF](https://i.gyazo.com/d9b41d0631a38b0f1aada0daa6f1a5d9.gif)
1. Enter the wish screen in Genshin Impact (default keybind: `F3`)
2. Select History at the bottom (located next to Details). You should see a 6x3 table with your most recent wishes.
3. Navigate with the arrows at the bottom until you see your most recent 5-star character or weapon. Alternatively, go to your first few wishes if you have yet to pull a 5-star in that banner.
4. Copy everything by pressing `Ctrl+A` followed by `Ctrl+C`
5. Paste the text into the calculator, selecting your server region. Click ▶ to view results.

## Installation
Open up the project's root directory, install dependencies, and run Webpack (should have [Node.js](https://nodejs.org) installed).
```
git clone https://github.com/forkpoweroutlet/genshin-pity-calculator
cd genshin-pity-calculator
npm install
npm run build
```

## Contributing
Pull requests are welcome; just [open an issue](https://github.com/forkpoweroutlet/genshin-pity-calculator/issues/new) if you want to talk about it first.
Changes from the main branch will automatically be merged into [`gh-pages`](https://github.com/forkpoweroutlet/genshin-pity-calculator/tree/gh-pages) where they are built and deployed by GitHub Actions.

## Disclaimer and caveats
### Usage of miHoYo content
Relating to the [`assets`](assets/) folder: © All rights reserved by miHoYo. Other properties belong to their respective owners.

### Other stuff
This only really works on PC and Genshin Impact set to the English language, though I might consider adding translations down the line. Also, Genshin doesn't appear to save wish history for more than 6 months, so do keep that in mind when using this tool.

If you want to have this repository taken down, please let me know and I will voluntarily do so.