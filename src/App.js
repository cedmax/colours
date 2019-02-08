import React, { useReducer } from "react";
import { ThemeProvider } from "emotion-theming";
import colors from "./colors.json";
import ColorElm from "./components/ColorElm";
import Details from "./components/Details";
import Template from "./components/Template";
import Filters from "./components/Filters";
import Header from "./components/Header";
import { List, ListItem } from "./components/List";
import "./app.css";
import EmptyList from "./components/EmptyList.js";
import reducers from "./helpers/reducers";

const defaultState = {
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
};

export default () => {
  const [state, dispatch] = useReducer(reducers, defaultState);
  const { colors, style, currentFilter, selected } = state;
  return (
    <ThemeProvider theme={style}>
      <Template>
        <Header>
          <Filters
            sortBy={e => dispatch({ type: "sort", payload: e.target.value })}
            filter={e => dispatch({ type: "filter", payload: e.target.value })}
            currentFilter={currentFilter}
          />
        </Header>
        <List>
          {colors.map(color => (
            <ListItem key={color.hex}>
              <ColorElm
                onClick={hex => dispatch({ type: "select", payload: hex })}
                color={color}
              />
            </ListItem>
          ))}
        </List>
        <EmptyList visible={!colors.length} />
        <Details
          onClick={hex => dispatch({ type: "select", payload: hex })}
          {...selected}
        />
      </Template>
    </ThemeProvider>
  );
};
