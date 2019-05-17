const fs = require("fs");
const cheerio = require("cheerio");
const settings = require("./settings.json");
const cssColors = require("./data/css-colors.json");
const hsl = require('hsl-to-hex')

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

const classifyColor = hsl => {
  try{
  return classification.find(({ prop, match, threshold }) => {
    return Math[match](hsl[prop], threshold) === hsl[prop];
  }).value;
  } catch(e) {
    console.log(hsl)
    throw e
  }
};

const colors = [];
settings.dataSets.forEach(key => {
  try {
    const body = fs.readFileSync(`${__dirname}/data/${key}.html`, "UTF-8");
    const $ = cheerio.load(body);
    const table = $("table caption").parent();
    const tableDataTrs = $(table).find("tbody tr");

    tableDataTrs.each((i, tr) => {
      const data = $(tr)
        .children()
        .toArray()
        .map(td =>
          $(td)
            .text()
            .trim()
        );
      const [name, hex, r, g, b, sortHue, sat1, lum] = data;
      const hueDeg = sortHue.split("♠")[1] || "0°";
      const h = parseInt(hueDeg.substring(0, hueDeg.length - 1), 10);
      const s = parseInt(sat1.substring(0, sat1.length - 1), 10);
      const l = parseInt(lum.substring(0, lum.length - 1), 10);

      if (hex.startsWith("#") && !colors.find(color => color.hex === hex)) {
        colors.push({
          name,
          hex,
          sortHue,
          group: classifyColor({
            h,
            s,
            l,
          }),
        });

        console.log("pushed", name);
      }
    });
  } catch (e) {
    console.log(e);
  }
});

const colWithCssMatch = colors.map(color => {
  const cssMatch = cssColors.find(cssColor => {
    const [name, hex] = cssColor;
    return color.hex === hex;
  });
  if (cssMatch) {
    const [name] = cssMatch;
    color.cssName = name;
  }
  return color;
});

const defaults = { h: 0, s: 100, l:50 }
const ranges = classification.reduce((acc, {threshold, match, prop, value}) => {
  const color = {...defaults};
  if (prop === 'h' && !acc.find(col=> col.name ===value)) {
    while (Math[match](color.h, threshold) !== threshold) {
      color.h++;
    }
    color.h = color.h - 10

    acc.push({
      hex: hsl(color.h,color.s, color.l),
      name: value
    })
  }
  
  return acc
}, []);

const html = fs.readFileSync(`${__dirname}/../public/index.html`);
const $ = cheerio.load(html);
$("#data").text(JSON.stringify({colors: colWithCssMatch, ranges  }));
fs.writeFileSync(`${__dirname}/../public/index.html`, $.html(), "UTF-8");
