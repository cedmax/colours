import React, { useReducer, useCallback } from "react";
import { ThemeProvider } from "emotion-theming";
import Details from "./components/Details";
import Template from "./components/Template";
import Filters from "./components/Filters";
import Header from "./components/Header";
import List from "./components/List";
import reducers from "./helpers/reducers";

const defaultState = colors => ({
  allColors: colors,
  colors,
  selected: {
    hex: "",
  },
  currentFilter: "",
  style: {
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
  const filter = useCallback(e =>
    dispatch({ type: "filter", payload: e.target.value })
  );
  const select = useCallback(hex => dispatch({ type: "select", payload: hex }));
  
  const { colors, style, currentFilter, selected } = state;
  return (
    <ThemeProvider theme={style}>
      <Template>
        <Header>
          <Filters
            sortBy={sortBy}
            filter={filter}
            currentFilter={currentFilter}
          />
        </Header>
        <List colors={colors} onClick={select} />
        <Details
          onClick={select}
          {...selected}
        />
      </Template>
    </ThemeProvider>
  );
};
