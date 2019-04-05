import React, { Component } from "react";
import originalList from "./colors.json";
import { ThemeProvider } from "emotion-theming";
import Template from "./components/Template";
import Filters from "./components/Filters";
import Header from "./components/Header";
import ColorList from "./components/ColorList";
import { getMostReadable, getFilteredColors } from "./helpers/utils";
import sorters from "./helpers/sorters";

const constants = {
  opacity: 0.6,
  lightOpacity: 0.5,
};

export default class App extends Component {
  state = {
    colors: originalList,
    currentFilter: "",
    currentSortBy: "name",
    style: {
      ...constants,
      color: "black",
      background: "white",
    },
  };

  onColorChange = hex => {
    this.setState({
      style: {
        ...this.state.style,
        background: hex,
        color: getMostReadable(hex),
      },
    });
  };

  sortBy = sortBy => {
    this.setState({
      currentSortBy: sortBy,
      colors: sorters[sortBy](this.state.colors),
    });
  };

  filter = currentFilter => {
    const colors = getFilteredColors(originalList, currentFilter);

    this.setState({ currentFilter, colors });
  };

  render() {
    const { colors, currentFilter, currentSortBy, style } = this.state;
    return (
      <ThemeProvider theme={style}>
        <Template>
          <Header>
            <Filters
              sortBy={this.sortBy}
              filter={this.filter}
              currentSortBy={currentSortBy}
              currentFilter={currentFilter}
            />
          </Header>
          <ColorList colors={colors} onChange={this.onColorChange} />
        </Template>
      </ThemeProvider>
    );
  }
}
