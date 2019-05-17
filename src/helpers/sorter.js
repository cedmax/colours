import colorsort from "colorsort";

export default {
  lum: (state, currentSort = "lum") => {
    const { colors } = state;
    const cs = new colorsort(colors.map(({ hex }) => hex).join(", "));

    cs.sort("lightness");

    const sortedColors = cs.formattedValues().map(hex => {
      const index = colors.findIndex(
        color => color.hex.toUpperCase() === hex.toUpperCase()
      );
      return colors[index];
    });

    return {
      ...state,
      currentSort,
      colors: sortedColors,
    };
  },
  hue: (state, currentSort = "hue") => {
    const { colors } = state;
    const cs = new colorsort(colors.map(({ hex }) => hex).join(", "));

    cs.sort("hue");

    const sortedColors = cs.formattedValues().map(hex => {
      const index = colors.findIndex(
        color => color.hex.toUpperCase() === hex.toUpperCase()
      );
      return colors[index];
    });

    return {
      ...state,
      currentSort,
      colors: sortedColors,
    };
  },

  hex: (state, currentSort = "hex") => {
    const { colors } = state;
    colors.sort((colorA, colorB) => {
      const aHex = colorA.hex.replace("#", "");
      const bHex = colorB.hex.replace("#", "");
      if (parseInt(aHex, 16) < parseInt(bHex, 16)) {
        return -1;
      }
      return 1;
    });
    return {
      ...state,
      currentSort,
      colors,
    };
  },

  name: (state, currentSort = "name") => {
    const { colors } = state;
    colors.sort((colorA, colorB) => {
      if (colorA.name < colorB.name) {
        return -1;
      }
      return 1;
    });

    return {
      ...state,
      currentSort,
      colors,
    };
  },
};
