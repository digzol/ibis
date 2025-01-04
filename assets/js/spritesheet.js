import {Items} from "./data/ItemsStatic.js";

const SOURCE_URL = "https://www.havenandhearth.com/mt/r/gfx/invobjs/";
const MAX_COLS = 15;
const ICON_SIZE = 32;
const ICON_PADDING = 2;

$(function() {
  const canvas = $("#spritesheet-canvas");
  const outputDiv = $("#spritesheet-output-css");
  const ctx = canvas[0].getContext("2d");

  const drawnItems = [];
  let outputString = ".game-icon {\n";

  // Check items to draw
  for (let key in Items) {
    const item = Items[key];

    if (item.gfx !== undefined) {
      drawnItems.push(item);
    }
  }

  let index = 1;
  let len = drawnItems.length + 1;
  let cols = Math.min(len, MAX_COLS);
  let rows = Math.ceil(len / cols);
  ctx.width = cols * (ICON_SIZE + ICON_PADDING) + ICON_PADDING;
  ctx.height = rows * (ICON_SIZE + ICON_PADDING) + ICON_PADDING;
  canvas.attr('width', ctx.width);
  canvas.attr('height', ctx.height);

  // add default icon
  const defaultIcon = document.createElement('img');
  defaultIcon.src = SOURCE_URL + "missing";
  defaultIcon.onload = () => drawIcon(defaultIcon, 0);
  appendString("missing", 0);

  // Load and draw icons
  drawnItems.forEach((item, index) => {
    const img = document.createElement('img');
    img.src = SOURCE_URL + item.gfx;
    img.onload = function() {
      drawIcon(img, index + 1);
    }
    img.onerror = function() {
      console.log(`Couldn't load icon from ${img.src}`);
      drawIcon(defaultIcon, index + 1);
    }

    appendString(item.id, index + 1);
  });

  outputString += "}";
  outputDiv.html(outputString);

  function drawIcon(img, index) {
    const pos = GetPos(index)
    ctx.drawImage(img, pos.x, pos.y, ICON_SIZE, ICON_SIZE);
  }

  function appendString(id, index) {
    const pos = GetPos(index)
    outputString += `  --icon-${id}: ${pos.x * -1}px ${pos.y * -1}px;\n`;
  }

  function GetPos(index) {
    return {
      x: (index % cols) * (ICON_SIZE + ICON_PADDING) + ICON_PADDING,
      y: Math.floor(index / cols) * (ICON_SIZE + ICON_PADDING) + ICON_PADDING
    }
  }
});
