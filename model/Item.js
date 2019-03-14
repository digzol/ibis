export class Item {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;

        if (options.parent !== undefined)
            this.parent = options.parent;

        if (options.detection !== undefined)
            this.detection = options.detection;

        if (options.describes !== undefined)
            this.describes = options.describes;

        if (options.icons !== undefined)
            this.icons = options.icons;

        this.getName = this._getName;
        this.getIcon = this._getIcon;
    }

    _getName() {
        return this.name;
    }

    _getIcon() {
        const format = "var(--icon-%)";

        if (this.icons === undefined) {
            return format.replace('%', this.id);
        } else {
            const icons = this.icons.map((icon) => {
                return format.replace('%', icon);
            });
            return icons.join(', ');
        }
    }
}