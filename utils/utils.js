export function normalizeText(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\\_\-\\/]+/g, "_");
}

export const groupeByName = (array) =>
  array.reduce((acc, value) => {
    const n = normalizeText(value.title.fr);
    // Group initialization
    if (!acc[n]) {
      acc[n] = [];
    }

    // Grouping
    acc[n].push(value);

    return acc;
  }, {});
