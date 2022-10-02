import supabase from "../utils/supabase.js";
import { normalizeText } from "../utils/utils.js";

// JSON
import jobsItems from "../../Minified data/jobsItems.json"; // Adapt the path

export default {
  syncTable: async function () {
    for (let key in jobsItems) {
      const match = await this.select(jobsItems[key]);
      if (match && match.length && jobsItems[key].title.fr) {
        console.log(`Job item [${jobsItems[key].title.fr}] exist ℹ️`);
        await this.update(jobsItems[key]);
      } else {
        await this.insert(jobsItems[key]);
      }
    }
  },

  select: async function (item) {
    // Only select the name of the first item of the current groupe
    const name = normalizeText(item.title.fr);
    await supabase.from("jobsItems").select("name").match({
      name,
    });
  },

  update: async function (item) {
    // Only select the name of the first item of the current groupe
    const name = normalizeText(item.title.fr);
    const { data, error } = await supabase
      .from("jobsItems")
      .update({ data: item })
      .match({
        name,
      });

    if (error) console.log(`Error while [${name}] update ❗️`);
    if (data) console.log(`[${name}] succesfully updated ✅`);
  },

  insert: async function (item) {
    // Only select the name of the first item of the current groupe
    const name = normalizeText(item.title.fr);
    const { data, error } = await supabase.from("jobsItems").insert([
      {
        name,
        data: item,
        itemId: item.definition.id,
        gfxId: item.definition.graphicParameters.gfxId,
      },
    ]);

    if (error) console.log(`Error while [${name}] insert ❗️`);
    if (data) console.log(`[${name}] succesfully added ✅`);
  },
};
