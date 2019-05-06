import React, { useState, useCallback, useEffect } from "react";
import originalList from "../colors.json";
import { ThemeProvider } from "emotion-theming";
import Template from "../components/Template";
import Filters from "../components/Filters";
import Header from "../components/Header";
import ColorList from "../components/ColorList";
import {
  getMostReadable,
  getFilteredColors,
  objectToHistory,
  listenToHistory,
} from "../helpers/utils";
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

  const [urlRestored, setUrlRestored] = useState(false);
  useEffect(() => {
    if (!urlRestored) {
      listenToHistory(data => {
        const { currentFilter, currentSortBy } = data;
        currentSortBy && sortBy(currentSortBy);
        currentFilter && filter(currentFilter);
      });
      setUrlRestored(true);
    } else {
      objectToHistory({
        currentSortBy,
        currentFilter,
      });
    }
  }, [currentSortBy, currentFilter]);

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