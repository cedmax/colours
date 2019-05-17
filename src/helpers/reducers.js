import sorter from "./sorter";
import tinycolor from "tinycolor2";

const createReducers = (reducers = {}) => (state, { type, payload } = {}) =>
  reducers[type] ? reducers[type](state, payload) : state;

export const actionObject = (type, payload) => ({ type, payload });

export default createReducers({
  filterRange: (state, value) => {
    const { allColors, currentSort } = state;
    let filtered;
    if (value) {
      const groups = value === "gray" ? ["white", "gray", "black"] : [value];
      filtered = allColors.filter(color => groups.includes(color.group));
    } else {
      filtered = allColors;
    }
    return sorter[currentSort]({
      ...state,
      colors: filtered,
    });
  },
  filter: (state, value) => {
    const { allColors, currentSort } = state;

    const filtered = allColors.filter(color => {
      return color.name.toLowerCase().includes(value.toLowerCase());
    });

    return sorter[currentSort]({
      ...state,
      currentFilter: value,
      colors: filtered,
    });
  },
  sort: (state, value) => sorter[value](state),
  select: (state, hex) => {
    const { colors } = state;
    const selected = colors.find(color => color.hex === hex);
    const readAble = tinycolor
      .mostReadable(hex, ["#ffffff", "#000000"])
      .toHexString();

    return {
      ...state,
      selected: selected || { hex },
      style: {
        ...state.style,
        background: hex,
        color: readAble,
      },
    };
  },
});
