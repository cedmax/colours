const fs = require("fs");
const cheerio = require("cheerio");
const settings = require("./settings.json");
const tinycolor = require("tinycolor2");

const { classify, saveToHTML, matchCssColors } = require("./utils");

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
        .map(td => $(td).text().trim());

      const [name, hex, hueDeg, sat1, lum] = data;
      const h = parseInt(hueDeg.substring(0, hueDeg.length - 1), 10);
      const s = parseInt(sat1.substring(0, sat1.length - 1), 10);
      const l = parseInt(lum.substring(0, lum.length - 1), 10);

      if (hex.startsWith("#") && !colors.find(color => color.hex === hex)) {
        colors.push({
          name,
          rgb: tinycolor(hex).toRgbString(),
          hex,
          group: classify({
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

const colWithCssMatch = matchCssColors(colors);

saveToHTML(colWithCssMatch);
