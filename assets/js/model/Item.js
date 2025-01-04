export class Item {
    constructor(id, name, gfx, icons) {
        this.id = id;
        this.name = name;
        this.gfx = gfx || id.replace("herbs-", "herbs/");
        this.icons = icons;

        this.iconString = this._getIconString();
    }

    _getIconString() {
        if (this.icons === undefined) {
            this.iconString = `var(--icon-${this.id})`;
        } else {
            this.iconString = this.icons.map((icon) => `var(--icon-${icon})`).join(', ');
        }
        return this.iconString;
    }
}
