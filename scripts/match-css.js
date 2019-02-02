const colors = require("./data/colors.json");
const cssColors = require("./data/css-colors.json");
const fs = require("fs");

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
