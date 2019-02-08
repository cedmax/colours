import React, { Component } from "react";
import tinycolor from "tinycolor2";
import Modal from "./Modal";
import { ListColours, Columns, SectionTitle } from "./DetailsParts";

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
    const { name, hex, onClick } = this.props;
    const color = tinycolor(hex);
    const complements = uniq(
      color.splitcomplement().map(an => an.toHexString().toUpperCase())
    );
    const triads = uniq(
      color.triad().map(an => an.toHexString().toUpperCase())
    );
    return (
      <Modal
        close={this.close}
        isOpen={this.state.open}
        title={`${name} details`}
      >
        <h2>{name}</h2>
        <Columns>
          <SectionTitle>Complements</SectionTitle>
          <ListColours list={complements} onClick={onClick} />
          <SectionTitle>Triad</SectionTitle>
          <ListColours list={triads} onClick={onClick} />
        </Columns>
      </Modal>
    );
  }
}
