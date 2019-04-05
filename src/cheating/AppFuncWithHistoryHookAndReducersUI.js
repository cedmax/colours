import React from "react";
import { ThemeProvider } from "emotion-theming";
import Template from "../components/Template";
import Filters from "../components/Filters";
import Header from "../components/Header";
import ColorList from "../components/ColorList";

export default ({
  currentFilter,
  currentSortBy,
  style,
  colors,
  sortBy,
  filter,
  onColorChange,
}) => (
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
