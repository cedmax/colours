import React, { useReducer, useCallback } from "react";
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
    hex: "",
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

export default ({ data }) => {
  const [state, dispatch] = useReducer(reducers, defaultState(data));
  const sortBy = useCallback(e =>
    dispatch({ type: "sort", payload: e.target.value })
  );
  const filterRange = useCallback(range =>
    dispatch({ type: "filterRange", payload: range })
  );
  const select = useCallback(hex => dispatch({ type: "select", payload: hex }));

  const { colors, style, selected, ranges } = state;
  return (
    <ThemeProvider theme={style}>
      <Template>
        <Header>
          <Filters
            filterRange={filterRange}
            ranges={ranges}
            sortBy={sortBy}
            reset={() => select(style.defaultBk)}
          />
        </Header>
        <List colors={colors} onClick={select} />
        <Details defaultHex={style.defaultBk} onClick={select} {...selected} />
      </Template>
    </ThemeProvider>
  );
};
