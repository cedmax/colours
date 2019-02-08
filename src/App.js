import React, { Component } from "react";
import tinycolor from "tinycolor2";
import colorsort from "colorsort";
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

export default class App extends Component {
  state = {
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

  onClick = hex => {
    const readAble = tinycolor
      .mostReadable(hex, ["#ffffff", "#000000"])
      .toHexString();

    let selected = colors.find(color => color.hex === hex);
    if (!selected) {
      selected = {
        hex,
      };
    }
    this.setState({
      selected,
      style: {
        ...this.state.style,
        background: hex,
        color: readAble,
      },
    });
  };

  sortByHue = () => {
    const cs = new colorsort(
      this.state.colors.map(({ hex }) => hex).join(", ")
    );
    const { colors } = this.state;
    cs.sort("hue").formattedValues();
    const sortedColors = cs.formattedValues().map(hex => {
      const index = colors.findIndex(
        color => color.hex.toUpperCase() === hex.toUpperCase()
      );
      const color = colors[index];
      colors.splice(index, 1);
      return color;
    });

    this.setState({
      colors: sortedColors,
    });
  };

  sortByHex = () => {
    const { colors } = this.state;
    colors.sort((colorA, colorB) => {
      const aHex = colorA.hex.replace("#", "");
      const bHex = colorB.hex.replace("#", "");
      if (parseInt(aHex, 16) < parseInt(bHex, 16)) {
        return -1;
      }
      return 1;
    });
    this.setState({
      colors,
    });
  };

  sortByName = () => {
    const { colors } = this.state;
    colors.sort((colorA, colorB) => {
      if (colorA.name < colorB.name) {
        return -1;
      }
      return 1;
    });
    this.setState({
      colors,
    });
  };

  sortBy = e => {
    switch (e.target.value) {
      case "name":
        this.sortByName();
        break;
      case "hue":
        this.sortByHue();
        break;
      case "hex":
        this.sortByHex();
        break;
      default:
        return;
    }
  };

  filter = e => {
    const { value } = e.target;
    const filtered = colors.filter(color => {
      return color.name.toLowerCase().includes(value.toLowerCase());
    });

    this.setState({
      currentFilter: value,
      colors: filtered,
    });
  };

  render() {
    const { colors, currentFilter, selected, style } = this.state;
    return (
      <ThemeProvider theme={style}>
        <Template>
          <Header>
            <Filters
              sortBy={this.sortBy}
              filter={this.filter}
              currentFilter={currentFilter}
            />
          </Header>
          <List>
            {colors.map(color => (
              <ListItem key={color.hex}>
                <ColorElm onClick={this.onClick} color={color} />
              </ListItem>
            ))}
          </List>
          <EmptyList visible={!colors.length} />
          <Details onClick={this.onClick} {...selected} />
        </Template>
      </ThemeProvider>
    );
  }
}
