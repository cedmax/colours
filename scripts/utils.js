const fs = require("fs");
const cheerio = require("cheerio");
const hsl = require("hsl-to-hex");
const cssColors = require("./data/css-colors.json");

const defaults = { h: 0, s: 100, l: 50 };
const classification = [
  { prop: "l", match: "min", threshold: 10, value: "black" },
  { prop: "l", match: "max", threshold: 96.5, value: "white" },
  { prop: "s", match: "min", threshold: 12, value: "gray" },
  { prop: "h", match: "min", threshold: 15, value: "red" },
  { prop: "h", match: "min", threshold: 40, value: "orange" },
  { prop: "h", match: "min", threshold: 65, value: "yellow" },
  { prop: "h", match: "min", threshold: 150, value: "green" },
  { prop: "h", match: "min", threshold: 200, value: "cyan" },
  { prop: "h", match: "min", threshold: 240, value: "blue" },
  { prop: "h", match: "min", threshold: 290, value: "violet" },
  { prop: "h", match: "min", threshold: 330, value: "magenta" },
  { prop: "h", match: "min", threshold: 360, value: "red" },
];

const ranges = classification.reduce(
  (acc, { threshold, match, prop, value }) => {
    const color = { ...defaults };
    if (prop === "h" && !acc.find(col => col.name === value)) {
      while (Math[match](color.h, threshold) !== threshold) {
        color.h++;
      }
      color.h = color.h - 10;

      acc.push({
        hex: hsl(color.h, color.s, color.l),
        name: value,
      });
    }

    return acc;
  },
  []
);

exports.classify = hsl => {
  try {
    return classification.find(({ prop, match, threshold }) => {
      return Math[match](hsl[prop], threshold) === hsl[prop];
    }).value;
  } catch (e) {
    console.log(hsl);
    throw e;
  }
};

exports.matchCssColors = colors =>
  colors.map(color => {
    const cssMatch = cssColors.find(cssColor => {
      const [hex] = cssColor;
      return color.hex === hex;
    });
    if (cssMatch) {
      const [name] = cssMatch;
      color.cssName = name;
    }
    return color;
  });

exports.saveToHTML = colors => {
  const html = fs.readFileSync(`${__dirname}/../public/index.html`);
  const $ = cheerio.load(html);
  $("#data").text(JSON.stringify({ colors, ranges }));
  fs.writeFileSync(`${__dirname}/../public/index.html`, $.html(), "UTF-8");
};
