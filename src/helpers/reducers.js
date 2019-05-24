import sorter from "./sorter";
import tinycolor from "tinycolor2";

const createReducers = (reducers = {}) => (state, { type, payload } = {}) =>
  reducers[type] ? reducers[type](state, payload) : state;

export default createReducers({
  sort: (state, currentSort) => ({
    ...state,
    currentSort,
    colors: sorter[currentSort](state),
  }),
  filterRange: (state, value) => {
    let filtered;
    const { allColors, currentSort } = state;

    if (value) {
      const groups = value === "gray" ? ["white", "gray", "black"] : [value];
      filtered = allColors.filter(color => groups.includes(color.group));
    } else {
      filtered = allColors;
    }

    return {
      ...state,
      colors: sorter[currentSort]({
        colors: filtered,
      }),
    };
  },
  select: (state, hex) => ({
    ...state,
    selected: { hex },
    style: {
      ...state.style,
      background: hex,
      color: tinycolor.mostReadable(hex, ["#ffffff", "#000000"]).toHexString(),
    },
  }),
});
