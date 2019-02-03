import React, { Component } from "react";
import tinycolor from "tinycolor2";
import colorsort from "colorsort";
import colors from "./colors.json";
import "./app.css";

const otherColor = 0.6;
const furtherColor = 0.5;

export default class App extends Component {
  state = {
    colors,
    background: "white",
    color: "black",
    filter: "",
  };

  onClick = hex => {
    const readAble = tinycolor
      .mostReadable(hex, ["#ffffff", "#000000"])
      .toHexString();

    this.setState({
      background: hex,
      color: readAble,
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
    const { colors, background, color, filter } = this.state;
    return (
      <div
        style={{
          color,
          background,
          columns: "300px 3",
          fontFamily: "Sans-Serif",
          fontSize: 15,
          padding: ".5rem",
        }}
      >
        <header style={{ maxWidth: 300 }}>
          <h2>
            Colour Name <em style={{ opacity: otherColor }}>/ Css Name</em>
            <br />
            <div style={{ fontSize: "80%" }}>
              <em style={{ opacity: otherColor }}>#Hex</em>{" "}
              <span
                style={{
                  fontSize: "70%",
                  marginLeft: "8px",
                }}
              >
                <span style={{ opacity: furtherColor }}>Sort by: </span>
                <select onChange={this.sortBy}>
                  <option value="name">Name</option>
                  <option value="hue">Hue</option>
                  <option value="hex">Hex</option>
                </select>
                <span style={{ opacity: furtherColor, marginLeft: 10 }}>
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
            <li key={color.hex}>
              <span
                onClick={() => this.onClick(color.hex)}
                style={{
                  display: "inline-block",
                  background: color.hex,
                  width: 30,
                  height: 30,
                  border:
                    color.hex === background
                      ? `1px solid ${color.hex}`
                      : "1px solid #000",
                  marginRight: 5,
                  marginBottom: 10,
                  verticalAlign: "top",
                  cursor: "pointer",
                }}
              />
              <span
                style={{
                  display: "inline-block",
                  verticalAlign: "top",
                  lineHeight: 1.2,
                }}
              >
                {color.name}{" "}
                {color.cssName && (
                  <em style={{ opacity: otherColor }}>/ {color.cssName} </em>
                )}
                <em
                  style={{
                    opacity: otherColor,
                    fontVariant: "small-caps",
                    fontSize: "80%",
                    display: "block",
                  }}
                >
                  {color.hex}
                </em>
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
