import colorsort from "colorsort";

export default {
  hue: state => {
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
      colors: sortedColors,
    };
  },

  hex: state => {
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
      colors,
    };
  },

  name: state => {
    const { colors } = state;
    colors.sort((colorA, colorB) => {
      if (colorA.name < colorB.name) {
        return -1;
      }
      return 1;
    });

    return {
      ...state,
      colors,
    };
  },
};
