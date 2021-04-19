import colorsort from "colorsort";

const colorToHex = ({ hex }) => hex;
const hexToColor = colors => hex => {
  const index = colors.findIndex(
    color => color.hex.toUpperCase() === hex.toUpperCase()
  );
  return colors[index];
};

const advancedSort = (colors, customSort) =>
  new colorsort(colors.map(colorToHex).join(", "))
    .sort(customSort)
    .formattedValues()
    .map(hexToColor(colors));

const colorSort = ({ colors }, customSort) => {
  switch (typeof customSort) {
    case "string":
      colors = advancedSort(colors, customSort);
      break;
    case "function":
      colors = [...colors.sort(customSort)];
      break;
    default:
      throw new Error("colorSort needs a custom sorter");
  }

  return colors;
};

const sorters = {
  lig: state => colorSort(state, "lightness"),
  hue: state => colorSort(state, "hue"),
  sat: state => colorSort(state, "saturation"),
  hex: state =>
    colorSort(state, ({ hex: a }, { hex: b }) =>
      parseInt(a.slice(1), 16) < parseInt(b.slice(1), 16) ? -1 : 1
    ),
  name: state => colorSort(state, (a, b) => (a.name < b.name ? -1 : 1)),
};


export default sorters