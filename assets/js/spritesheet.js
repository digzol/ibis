import {Items} from "./data/ItemsStatic.js";
import {Icons} from "./data/IconsStatic.js";

const MAX_COLS = 15;
const ICON_PADDING = 2;

const icons = GetIconsToDraw();

$(function() {
  const $spritesheetData = $("#spritesheet-data");
  const $spritesheetDataSmall = $("#spritesheet-data-small");

  displaySheet(icons, $spritesheetData, 32, "game-icon-1x1");
  displaySheet(icons, $spritesheetDataSmall, 16, "small-icon");
});

function GetIconsToDraw() {
  const icons = [];
  const sets = [Icons.CharSheet, Icons.Wounds, Icons.Custom];

  icons.push({ id: "missing", path: "https://www.havenandhearth.com/mt/r/gfx/invobjs/missing" });

  sets.forEach(set => {
    const path = set.path;
    for (let ind in set.entries) {
      const id = set.entries[ind];
      icons.push({id: id, path: `${path}/${id}` });
    }
  });

  for (let key in Items) {
    const item = Items[key];
    if (item.gfx !== undefined) {
      icons.push({id: item.id, path: `https://www.havenandhearth.com/mt/r/gfx/invobjs/${item.gfx}` });
    }
  }

  icons.forEach(icon => {
    icon.img = document.createElement('img');
    icon.img.src = icon.path;
    icon.img.addEventListener("error", () =>
      console.log(`Couldn't load icon from ${icon.img.src}`));
  });

  return icons;
}

function displaySheet(icons, $target, iconSize, cssClass) {
  const canvas = $("canvas", $target);
  const outputDiv = $("textarea", $target);
  const ctx = canvas[0].getContext("2d");
  let outputString = `.${cssClass} { background-position: ${ICON_PADDING * -1}px ${ICON_PADDING * -1}px; }\n`;

  const len = icons.length;
  const cols = Math.min(len, MAX_COLS);
  const rows = Math.ceil(len / cols);
  ctx.width = cols * (iconSize + ICON_PADDING) + ICON_PADDING;
  ctx.height = rows * (iconSize + ICON_PADDING) + ICON_PADDING;
  canvas.attr('width', ctx.width);
  canvas.attr('height', ctx.height);

  icons.forEach((icon, index) => {
    const pos = GetPos(index, iconSize, cols);

    icon.img.addEventListener("load", () =>
      ctx.drawImage(icon.img, pos.x, pos.y, iconSize, iconSize));

    icon.img.addEventListener("error", () =>
      ctx.drawImage(icons[0].img, pos.x, pos.y, iconSize, iconSize));

    outputString += `.${cssClass}.icon-${icon.id} { background-position: ${pos.x * -1}px ${pos.y * -1}px; }\n`;
  });

  outputDiv.html(outputString);
}

function GetPos(index, iconSize, cols) {
  return {
    x: (index % cols) * (iconSize + ICON_PADDING) + ICON_PADDING,
    y: Math.floor(index / cols) * (iconSize + ICON_PADDING) + ICON_PADDING
  }
}
