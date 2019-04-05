import sorters from "./sorters";
import { getFilteredColors, getMostReadable } from "./utils";

export default (state, { type, payload }) => {
  switch (type) {
    case "filter":
      return {
        ...state,
        currentFilter: payload,
        colors: getFilteredColors(state.allColors, payload),
      };
    case "sort":
      return {
        ...state,
        currentSortBy: payload,
        colors: sorters[payload](state.colors),
      };
    case "change":
      return {
        ...state,
        style: {
          ...state.style,
          background: payload,
          color: getMostReadable(payload),
        },
      };
    default:
      return state;
  }
};
