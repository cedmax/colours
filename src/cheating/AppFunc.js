import React, { useState, useCallback } from "react";
import originalList from "../colors.json";
import { ThemeProvider } from "emotion-theming";
import Template from "../components/Template";
import Filters from "../components/Filters";
import Header from "../components/Header";
import ColorList from "../components/ColorList";
import { getMostReadable, getFilteredColors } from "../helpers/utils";
import sorters from "../helpers/sorters";

const constants = {
  opacity: 0.6,
  lightOpacity: 0.5,
};

export default () => {
  const [colors, setColors] = useState(originalList);
  const [currentFilter, setCurrentFilter] = useState("");
  const [currentSortBy, setCurrentSortBy] = useState("name");

  const [style, setStyle] = useState({
    ...constants,
    color: "black",
    background: "white",
  });

  const sortBy = useCallback(sortBy => {
    const sortingFunction = sorters[sortBy];
    setCurrentSortBy(sortBy);
    setColors(sortingFunction);
  });

  const filter = useCallback(currentFilter => {
    const colors = getFilteredColors(originalList, currentFilter);
    setCurrentFilter(currentFilter);
    setColors(colors);
  });

  const onColorChange = useCallback(hex => {
    setStyle({
      ...style,
      background: hex,
      color: getMostReadable(hex),
    });
  });

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