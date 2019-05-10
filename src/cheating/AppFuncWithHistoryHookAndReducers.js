import React, { useReducer, useCallback } from "react";
import originalList from "../colors.json";
import { ThemeProvider } from "emotion-theming";
import Template from "../components/Template";
import Filters from "../components/Filters";
import Header from "../components/Header";
import ColorList from "../components/ColorList";
import { useQueryString } from "../helpers/hooks.v2";
import reducers from "../helpers/reducers";

const defaultState = {
  allColors: originalList,
  colors: originalList,
  currentFilter: "",
  currentSortBy: "name",
  style: {
    color: "black",
    background: "white",
    opacity: 0.6,
    lightOpacity: 0.5,
  },
};

export default () => {
  const [state, dispatch] = useReducer(reducers, defaultState);

  const emitDispatch = useCallback((type, payload) =>
    dispatch({ type, payload })
  );
  const sortBy = useCallback(sortBy => emitDispatch("sort", sortBy));
  const filter = useCallback(filter => emitDispatch("filter", filter));
  const onColorChange = useCallback(hex => emitDispatch("change", hex));

  const { currentFilter, currentSortBy, style, colors } = state;
  useQueryString(
    { currentSortBy, currentFilter },
    { currentSortBy: sortBy, currentFilter: filter },
    defaultState
  );

  return (
    <ThemeProvider theme={style}>
      <Template>
        <Header>
          <Filters
            sortBy={sortBy}
            filter={filter}
            currentSortBy={currentSortBy}
            currentFilter={currentFilter}
          />
        </Header>
        <ColorList colors={colors} onChange={onColorChange} />
      </Template>
    </ThemeProvider>
  );
};
