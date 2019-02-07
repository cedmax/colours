import React, { Component } from "react";
import tinycolor from "tinycolor2";
import Modal from "react-modal";
import ColorElm from "./ColorElm";

const uniq = arr => [...new Set(arr)];

export default class Detail extends Component {
  state = {
    hex: "",
    open: false,
  };

  close = () => {
    this.setState({
      open: false,
    });
  };

  static getDerivedStateFromProps(props, state) {
    return {
      hex: props.hex,
      open: props.hex !== state.hex,
    };
  }

  render() {
    const { name, hex, style, onClick } = this.props;
    const color = tinycolor(hex);
    const complements = uniq(
      color.splitcomplement().map(an => an.toHexString().toUpperCase())
    );
    const triads = uniq(
      color.triad().map(an => an.toHexString().toUpperCase())
    );
    return (
      <Modal
        onRequestClose={() => this.setState({ open: false })}
        isOpen={this.state.open}
        style={{
          overlay: {
            background: "transparent",
            pointerEvents: "none",
          },
          content: {
            pointerEvents: "all",
            background: "rgba(255, 255, 255, .9)",
            top: "auto",
            left: "auto",
            right: 20,
            bottom: 20,
            overflow: "visible",
            border: 0,
          },
        }}
        contentLabel={`${name} details`}
      >
        <h2>{name}</h2>
        <button
          onClick={this.close}
          style={{
            background: "#666",
            color: "#fff",
            borderRadius: 50,
            height: 25,
            textAlign: "center",
            position: "absolute",
            top: -10,
            right: -10,
            border: "1px solid #666",
            cursor: "pointer",
          }}
        >
          x
        </button>
        <div style={{ columns: 2, columnGap: 50 }}>
          <h4 style={{ marginTop: 0 }}>Complements</h4>
          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {complements.map(hex => (
              <li
                key={hex}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <ColorElm
                  forceBorder
                  onClick={onClick}
                  hex={hex}
                  style={style}
                />
              </li>
            ))}
          </ol>
          <h4 style={{ marginTop: 0 }}>Triad</h4>
          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {triads.map(hex => (
              <li
                key={hex}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <ColorElm
                  forceBorder
                  onClick={onClick}
                  hex={hex}
                  style={style}
                />
              </li>
            ))}
          </ol>
        </div>
      </Modal>
    );
  }
}
