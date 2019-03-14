import {Item} from './Item.js';

class ItemCollection {
    constructor() {
        this.source = './model/items.json';
        this._entries = [];

        this.ready = this.init();
    }

    async init() {
        const json = $.getJSON(this.source);

        await json.then((data) => {
            parseData(this, data)
        });

        return this;
    }

    getEntries() {
        return this._entries;
    }
}

function parseData(holder, data) {
    const map = holder.getEntries();

    data['entries'].forEach(function (entry) {
        const obj = new Item(entry);
        const id = obj.id;

        map.push(obj);
        map[id] = obj;
    });
}

const instance = new ItemCollection().ready;

export const getItemsData = async function() {
    return await instance;
};