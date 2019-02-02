const fs = require("fs");
const cheerio = require("cheerio");
const settings = require("./settings.json");

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
      if (hex.startsWith("#")) {
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

fs.writeFileSync(
  `${__dirname}/data/colors.json`,
  JSON.stringify(colors),
  "UTF-8"
);
