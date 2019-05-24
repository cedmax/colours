import React, { useReducer, useCallback, memo } from "react";
import { ThemeProvider } from "emotion-theming";
import Details from "./components/Details";
import Template from "./components/Template";
import Filters from "./components/Filters";
import Header from "./components/Header";
import List from "./components/List";
import reducers from "./helpers/reducers";

const defaultState = ({ colors, ranges }) => ({
  allColors: colors,
  ranges,
  colors,
  selected: {
    hex: "white",
  },
  currentSort: "name",
  style: {
    defaultBk: "white",
    color: "black",
    background: "white",
    opacity: 0.6,
    lightOpacity: 0.5,
  },
});

export default memo(({ data }) => {
  const [state, dispatch] = useReducer(reducers, defaultState(data));
  const { colors, style, selected, ranges } = state;

  const emit = useCallback((type, payload) => dispatch({ type, payload }), []);
  const sortBy = useCallback(e => emit("sort", e.target.value), [emit]);
  const filterRange = useCallback(range => emit("filterRange", range), [emit]);
  const select = useCallback(hex => emit("select", hex), [emit]);
  const reset = useCallback(() => select(style.defaultBk), [
    select,
    style.defaultBk,
  ]);

  return (
    <ThemeProvider theme={style}>
      <Template>
        <Header>
          <Filters
            filterRange={filterRange}
            ranges={ranges}
            sortBy={sortBy}
            reset={reset}
          />
        </Header>
        <List colors={colors} onClick={select} />
        <Details defaultHex={style.defaultBk} onClick={select} {...selected} />
      </Template>
    </ThemeProvider>
  );
});
