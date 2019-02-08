import sorter from "./sorter";
import tinycolor from "tinycolor2";

const createReducers = (reducers = {}) => (state, { type, payload } = {}) =>
  reducers[type] ? reducers[type](state, payload) : state;

export const actionObject = (type, payload) => ({ type, payload });

export default createReducers({
  filter: (state, value) => {
    const filtered = state.colors.filter(color => {
      return color.name.toLowerCase().includes(value.toLowerCase());
    });

    return {
      ...state,
      currentFilter: value,
      colors: filtered,
    };
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
