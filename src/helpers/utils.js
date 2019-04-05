import tinycolor from "tinycolor2";

export const getMostReadable = hex =>
  tinycolor.mostReadable(hex, ["#ffffff", "#000000"]).toHexString();

export const getFilteredColors = (list, filter) =>
  list.filter(color => {
    return color.name.toLowerCase().includes(filter.toLowerCase());
  });
