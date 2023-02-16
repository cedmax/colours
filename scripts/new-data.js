const settings = require("./settings.json");
const tinycolor = require("tinycolor2");
const axios = require("axios");

const { classify, matchCssColors, saveToHTML } = require("./utils");

const translateHSL = ({ h, s, l }) => {
  return {
    h,
    s: s * 100,
    l: l * 100,
  };
};

(async () => {
  const { data } = await axios.get(settings.source);

  const colors = data.reduce((colors, { name, hex }) => {
    const color = tinycolor(hex);
    colors = [
      ...colors,
      {
        name,
        rgb: color.toRgbString(),
        hex,
        group: classify(translateHSL(color.toHsl())),
      },
    ];
    return colors;
  }, []);

  const colWithCssMatch = matchCssColors(colors);

  saveToHTML(colWithCssMatch);
})();
