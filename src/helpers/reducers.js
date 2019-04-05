import sorters from "./sorters";
import { getFilteredColors, getMostReadable } from "./utils";

const createReducers = (reducers = {}) => (state, { type, payload } = {}) =>
  reducers[type] ? reducers[type](state, payload) : state;

export const actionObject = (type, payload) => ({ type, payload });

export default createReducers({
  filter: (state, value) => ({
    ...state,
    currentFilter: value,
    colors: getFilteredColors(state.allColors, value),
  }),
  sort: (state, value) => ({
    ...state,
    currentSortBy: value,
    colors: sorters[value](state.colors),
  }),
  change: (state, hex) => ({
    ...state,
    style: {
      ...state.style,
      background: hex,
      color: getMostReadable(hex),
    },
  }),
});
