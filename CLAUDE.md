# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

"Click the cat" — a small vanilla HTML/CSS/JavaScript exercise (no build tooling, no package manager, no dependencies, no tests). Click on the highlighted (green/cat) grid cell before it moves to a new random cell.

## Running

There is no build or dev server. Open [index.html](index.html) directly in a browser, or serve the directory with any static file server (e.g. `python3 -m http.server`) if `file://` restrictions cause image-loading issues.

## Architecture

Three files drive the whole app:

- [index.html](index.html) — static 4x4 grid of `.item` divs (`#i1`–`#i16`) inside `#main`, plus a `#message` element for feedback text.
- [style.css](style.css) — grid layout via CSS Grid (`grid-template: repeat(4,1fr) / repeat(4,1fr)`) and cat image sizing.
- [grid.js](grid.js) — all behavior:
  - `new_green(cur_id)` picks a random cell (excluding `cur_id`), sets its background to green, and injects the idle cat image (`img_cat`).
  - Click handler on each `.item`: if the clicked cell is the current green one, shows a success message, resets it, and calls `new_green` on a different cell; otherwise shows a failure message and swaps the *correct* cell's image to the "speaking" cat (`img_cat_speak`) via `get_cur_green()`.
  - `get_random_message(m_tab)` avoids repeating the currently displayed message.
  - State is tracked implicitly through DOM (`style.background === "green"` marks the active cell) rather than a JS variable — keep this in mind when modifying game logic.

Cat images (idle/hover/speak, with/without background) live in [img/](img/); only `cat.png` and `cat-speak.png` are currently wired up in [grid.js](grid.js) — the hover variants and their commented-out mouseover/mouseout listeners are dead code left in place.
