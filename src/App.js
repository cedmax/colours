import React, { Component } from "react";
import colors from "./colors.json";
import colorsort from "colorsort";

const cs = new colorsort(colors.map(({ hex }) => hex).join(", "));

export default class App extends Component {
  state = {
    colors,
    sorting: "name",
  };

  sortByHue = () => {
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
      sorting: "hue",
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
      sorting: "hex",
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
      sorting: "name",
    });
  };

  render() {
    const { colors } = this.state;
    return (
      <div
        style={{ columns: "250px 3", fontFamily: "Sans-Serif", fontSize: 15 }}
      >
        <h2>
          Colour Name <em style={{ color: "#666" }}>/ Css Name</em>
          <br />
          <div style={{ fontSize: "80%", color: "#666" }}>
            <em>#Hex</em>{" "}
            <span style={{ fontSize: "70%", color: "#888", marginLeft: "8px" }}>
              Sort by:{" "}
              <input
                type="radio"
                name="sorting"
                value="name"
                onChange={this.sortByName}
                checked={this.state.sorting === "name"}
              />{" "}
              Name{" "}
              <input
                type="radio"
                name="sorting"
                value="hue"
                onChange={this.sortByHue}
                checked={this.state.sorting === "hue"}
              />{" "}
              Hue{" "}
              <input
                type="radio"
                name="sorting"
                value="hex"
                onChange={this.sortByHex}
                checked={this.state.sorting === "hex"}
              />{" "}
              Hex
            </span>
          </div>
        </h2>
        {colors.map(color => (
          <div key={color.name + color.hex}>
            <span
              style={{
                display: "inline-block",
                background: color.hex,
                width: 30,
                height: 30,
                border: "1px solid #000",
                marginRight: 5,
                marginBottom: 10,
                verticalAlign: "top",
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
                <em style={{ color: "#666" }}>/ {color.cssName} </em>
              )}
              <em
                style={{
                  color: "#666",
                  fontVariant: "small-caps",
                  fontSize: "80%",
                  display: "block",
                }}
              >
                {color.hex}
              </em>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

//
