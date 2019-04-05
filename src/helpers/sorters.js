import colorsort from "colorsort";

export default {
  hue: colors => {
    const cs = new colorsort(colors.map(({ hex }) => hex).join(", "));

    cs.sort("hue");

    const sortedColors = cs.formattedValues().map(hex => {
      const index = colors.findIndex(
        color => color.hex.toUpperCase() === hex.toUpperCase()
      );
      return colors[index];
    });

    return sortedColors;
  },

  hex: colors => {
    colors.sort((colorA, colorB) => {
      const aHex = colorA.hex.replace("#", "");
      const bHex = colorB.hex.replace("#", "");
      if (parseInt(aHex, 16) < parseInt(bHex, 16)) {
        return -1;
      }
      return 1;
    });
    return [...colors];
  },

  name: colors => {
    colors.sort((colorA, colorB) => {
      if (colorA.name < colorB.name) {
        return -1;
      }
      return 1;
    });

    return [...colors];
  },
};
