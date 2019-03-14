import json
import math
import os

import requests
from PIL import Image

ICON_SIZE = 32
ICON_PADDING = 1


def download(gfx_path):
    filename = gfx_path.replace('/', '-')
    t_path = './input/' + filename + '.png'

    print("Downloading gfx file '" + t_path + "'")

    r = requests.get('http://www.havenandhearth.com/mt/r/gfx/invobjs/' + gfx_path)
    if r.status_code == 200:
        open(t_path, 'wb').write(r.content)


def generate_sprite_map():
    json_path = os.path.abspath(os.path.join(__file__, "../../../", "data/items.json"))
    json_file = open(json_path)
    items = json.load(json_file)

    sprites = ['base.png']
    sprites_id = ['missing']

    for item in items["entries"]:
        if 'gfx' not in item:
            continue

        filename = item['gfx'].replace('/', '-')
        file_path = './input/' + filename + '.png'

        if not os.path.isfile(file_path):
            download(item['gfx'])

        if not os.path.isfile(file_path):
            continue

        w, h = Image.open(file_path).size

        if w == 32 and h == 32:
            sprites.append(file_path)
            sprites_id.append(item['id'])

    cols = round(math.sqrt(len(sprites)))
    rows = math.ceil(len(sprites) / cols)
    map_w = cols * (ICON_SIZE + ICON_PADDING) - ICON_PADDING
    map_h = rows * (ICON_SIZE + ICON_PADDING) - ICON_PADDING
    map_img = Image.new('RGBA', (map_w, map_h))
    map_css = ".game-icon {\n"

    for i in range(len(sprites)):
        sprite = sprites[i]
        sprite_id = sprites_id[i]
        img = Image.open(sprite)
        pos_x = i % cols * (ICON_SIZE + ICON_PADDING)
        pos_y = math.floor(i / (cols)) * (ICON_SIZE + ICON_PADDING)
        map_img.paste(img, (pos_x, pos_y))
        map_css += "\t--icon-" + sprite_id + ": " + str(pos_x * -1) + "px " + str(pos_y * -1) + "px;\n"

    map_css += "}"

    map_img.save('sprites.png')
    open('sprites.css', 'wb').write(bytearray(map_css, 'UTF-8'))

    map_img_export_path = os.path.abspath(os.path.join(__file__, "../../../", "gfx/", "sprites.png"))
    map_css_export_path = os.path.abspath(os.path.join(__file__, "../../../", "styles/", "sprites.css"))

    map_img.save(map_img_export_path)
    open(map_css_export_path, 'wb').write(bytearray(map_css, 'UTF-8'))


generate_sprite_map()
