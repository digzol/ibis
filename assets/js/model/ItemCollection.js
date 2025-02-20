import {Item} from './Item.js';

class ItemCollection {
    constructor() {
        this.defaultSource = '/ibis/assets/json/items.json';
        this.items = [];
        this.nameLookup = [];
    }

    getEntries() {
        return this.items;
    }

    async loadData(sourceURL) {
        this.source = sourceURL || this.defaultSource;
        await $.getJSON(this.source).then(
          (data) => this.parseData(data),
          (response, status) => {
            console.log(`[${status}] Couldn't fetch JSON data from URL: ${this.source}`);
        });

        return this;
    }

    getOrCreateEntry(id, name, gfx) {
        return this.addEntry(id, name, gfx);
    }

    getItemByName(name) {
        return this.nameLookup[name];
    }

    parseData(data) {
        for (let entry of data['entries']) {
            this.addEntry(entry.id, entry.name, entry.gfx);
        }
    }

    addEntry(id, name, gfx) {
        if (!(id in this.items))
        {
            const newItem = new Item(id, name, gfx);
            this.items.push(newItem);
            this.items[newItem.id] = newItem;
            this.nameLookup[newItem.name] = newItem;
        }

        return this.items[id];
    }
}

const instance = new ItemCollection();

export const Items = instance.getEntries();
export const LoadItemData = (...args) => instance.loadData(...args);
export const GetOrCreateItem = (...args) => instance.getOrCreateEntry(...args);
export const GetItemByName = (...args) => instance.getItemByName(...args);
