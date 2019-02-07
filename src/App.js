import React, { Component } from "react";
import tinycolor from "tinycolor2";
import colorsort from "colorsort";
import colors from "./colors.json";
import ColorElm from "./ColorElm";
import Details from "./Details";
import "./app.css";

export default class App extends Component {
  state = {
    colors,
    selected: {
      hex: "",
    },
    filter: "",
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
      filter: value,
      colors: filtered,
    });
  };

  render() {
    const { colors, filter, selected, style } = this.state;
    return (
      <div
        style={{
          color: style.color,
          background: style.background,
          columns: "300px 3",
          fontFamily: "Sans-Serif",
          fontSize: 15,
          padding: ".5rem",
        }}
      >
        <header style={{ maxWidth: 300 }}>
          <h2>
            Colour Name <em style={{ opacity: style.opacity }}>/ Css Name</em>
            <br />
            <div style={{ fontSize: "80%" }}>
              <em style={{ opacity: style.opacity }}>#Hex</em>{" "}
              <span
                style={{
                  fontSize: "70%",
                  marginLeft: "8px",
                }}
              >
                <span style={{ opacity: style.lightOpacity }}>Sort by: </span>
                <select onChange={this.sortBy}>
                  <option value="name">Name</option>
                  <option value="hue">Hue</option>
                  <option value="hex">Hex</option>
                </select>
                <span style={{ opacity: style.lightOpacity, marginLeft: 10 }}>
                  Filter:{" "}
                </span>
                <input
                  onChange={this.filter}
                  style={{ width: 70 }}
                  type="text"
                  value={filter}
                />
              </span>
            </div>
          </h2>
        </header>
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {!colors.length && (
            <h3 style={{ lineHeight: 5, textAlign: "center" }}>No Result</h3>
          )}
          {colors.map(color => (
            <li style={{ marginBottom: 10 }} key={color.hex}>
              <ColorElm onClick={this.onClick} {...color} style={style} />
            </li>
          ))}
        </ol>
        <Details onClick={this.onClick} {...selected} style={style} />
      </div>
    );
  }
}
