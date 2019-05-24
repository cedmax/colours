import React, { useState, memo } from "react";
import colorsHelper from "../helpers/colors";
import Modal from "./Modal";
import { ListColours, Columns, SectionTitle } from "./DetailsParts";

export default memo(props => {
  const { name, onClick, defaultHex, hex: newHex } = props;

  const [{ hex, open }, setState] = useState({
    hex: "",
    open: false,
  });

  if (hex !== newHex) {
    setState({
      hex: newHex,
      open: newHex !== defaultHex,
    });
  }

  if (!open) return null;

  const { complements, triads } = colorsHelper(hex);

  return (
    <Modal
      close={() => {
        onClick(defaultHex);
        setState({ hex: defaultHex, open: false });
      }}
      title={`${name} details`}
    >
      <h2>{name || hex}</h2>
      <Columns>
        <SectionTitle>Complements</SectionTitle>
        <ListColours list={complements} onClick={onClick} />
        <SectionTitle>Triad</SectionTitle>
        <ListColours list={triads} onClick={onClick} />
      </Columns>
    </Modal>
  );
});
