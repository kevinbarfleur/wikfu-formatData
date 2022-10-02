import supabase from "../utils/supabase.js";
import { normalizeText, groupeByName } from "../utils/utils.js";

// JSON
import items from "../../Minified data/items.json"; // Adapt the path
const _items = groupeByName(items);

export default {
  syncTable: async function () {
    for (let key in _items) {
      const match = await this.select(_items[key]);
      if (match && match.length && _items[key][0].title.fr) {
        console.log(`Item [${_items[key][0].title.fr}] exist ℹ️`);
        await this.update(_items[key]);
      } else {
        await this.insert(_items[key]);
      }
    }
  },

  select: async function (item) {
    // Only select the name of the first item of the current groupe
    const name = normalizeText(item[0].title.fr);
    await supabase.from("items").select("name").match({
      name,
    });
  },

  update: async function (item) {
    // Only select the name of the first item of the current groupe
    const name = normalizeText(item[0].title.fr);
    const { data, error } = await supabase
      .from("items")
      .update({ data: item })
      .match({
        name,
      });

    if (error) console.log(`Error while [${name}] update ❗️`);
    if (data) console.log(`[${name}] succesfully updated ✅`);
  },

  insert: async function (item) {
    // Only select the name of the first item of the current groupe
    const name = normalizeText(item[0].title.fr);
    const { data, error } = await supabase.from("items").insert([
      {
        name,
        data: item,
        itemId: item[0].definition.item.id,
        gfxId: item[0].definition.item.graphicParameters.gfxId,
      },
    ]);

    if (error) console.log(`Error while [${name}] insert ❗️`);
    if (data) console.log(`[${name}] succesfully added ✅`);
  },
};
