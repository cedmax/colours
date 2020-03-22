import React, { useReducer, useCallback, memo } from "react";
import { ThemeProvider } from "emotion-theming";
import Template from "./components/Template";
import Filters from "./components/Filters";
import Header from "./components/Header";
import Bar from "./components/Bar";
import List from "./components/List";
import reducers from "./helpers/reducers";

const defaultState = ({ colors, ranges }) => ({
  allColors: colors,
  ranges,
  colors,
  selected: {
    hex: "white"
  },
  currentSort: "name",
  style: {
    opacity: 0.6,
    lightOpacity: 0.5
  }
});

export default memo(({ data }) => {
  const [state, dispatch] = useReducer(reducers, defaultState(data));
  const { colors, style, selected, ranges } = state;

  const emit = useCallback((type, payload) => dispatch({ type, payload }), []);
  const sortBy = useCallback(e => emit("sort", e.target.value), [emit]);
  const filterRange = useCallback(range => emit("filterRange", range), [emit]);
  const select = useCallback((hex, name) => emit("select", { hex, name }), [
    emit
  ]);

  return (
    <ThemeProvider theme={style}>
      <Template>
        <Bar color={selected.hex} />
        <Header>
          <Filters
            qty={colors.length}
            filterRange={filterRange}
            ranges={ranges}
            sortBy={sortBy}
          />
        </Header>
        <List colors={colors} onClick={select} />
      </Template>
    </ThemeProvider>
  );
});
