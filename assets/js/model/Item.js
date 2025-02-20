export class Item {
    constructor(id, name, gfx, icons) {
        this.id = id;
        this.name = name;
        this.gfx = gfx || id.replace("herbs-", "herbs/");
        this.icons = icons;
    }
}
