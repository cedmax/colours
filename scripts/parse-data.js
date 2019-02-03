const fs = require("fs");
const cheerio = require("cheerio");
const settings = require("./settings.json");
const cssColors = require("./data/css-colors.json");

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
      const [name, hex, r, g, b, sortHue, sat1, lum, sat2, val] = data;

      const hueDeg = sortHue.split("♠")[1] || "0°";
      const hue = hueDeg.substring(0, hueDeg.length - 1);
      const s = sat2.substring(0, sat2.length - 1);
      const v = val.substring(0, val.length - 1);
      if (hex.startsWith("#") && !colors.find(color => color.hex === hex)) {
        colors.push({
          name,
          hex,
          r,
          g,
          b,
          sortHue,
          hue,
          s,
          v,
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

fs.writeFileSync(
  `${__dirname}/../src/colors.json`,
  JSON.stringify(colWithCssMatch),
  "UTF-8"
);
