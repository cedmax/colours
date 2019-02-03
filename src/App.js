import React, { Component } from "react";
import tinycolor from "tinycolor2";
import colorsort from "colorsort";
import colors from "./colors.json";
import "./app.css";

const cs = new colorsort(colors.map(({ hex }) => hex).join(", "));

const otherColor = 0.6;
const furtherColor = 0.5;

export default class App extends Component {
  state = {
    colors,
    background: "white",
    color: "black",
    sorting: "name",
  };

  onClick = color => {
    const background = tinycolor(color);
    const readAble = tinycolor
      .mostReadable(color, colors.map(({ hex }) => hex))
      .toHexString();

    this.setState({
      background,
      color: readAble,
    });
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
    const { colors, background, color } = this.state;
    return (
      <div
        style={{
          color,
          background,
          columns: "250px 3",
          fontFamily: "Sans-Serif",
          fontSize: 15,
          padding: ".5rem",
        }}
      >
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
              <input
                type="radio"
                name="sorting"
                value="name"
                onChange={this.sortByName}
                checked={this.state.sorting === "name"}
              />{" "}
              <span style={{ opacity: furtherColor }}>Name </span>
              <input
                type="radio"
                name="sorting"
                value="hue"
                onChange={this.sortByHue}
                checked={this.state.sorting === "hue"}
              />{" "}
              <span style={{ opacity: furtherColor }}>Hue </span>
              <input
                type="radio"
                name="sorting"
                value="hex"
                onChange={this.sortByHex}
                checked={this.state.sorting === "hex"}
              />{" "}
              <span style={{ opacity: furtherColor }}>Hex</span>
            </span>
          </div>
        </h2>
        {colors.map(color => (
          <div key={color.name + color.hex}>
            <span
              onClick={() => this.onClick(color.hex)}
              style={{
                display: "inline-block",
                background: color.hex,
                width: 30,
                height: 30,
                border: "1px solid #000",
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
          </div>
        ))}
      </div>
    );
  }
}

//
