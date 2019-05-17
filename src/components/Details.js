import React, { useState } from "react";
import colorsHelper from "../helpers/colors";
import Modal from "./Modal";
import { ListColours, Columns, SectionTitle } from "./DetailsParts";

export default React.memo(props => {
  const [state, setState] = useState({
    hex: "",
    open: false,
  });

  const { hex, open } = state;

  if (hex !== props.hex) {
    setState({
      hex: props.hex,
      open: props.hex !==props.defaultHex,
    });
  }

  if (!open) {
    return;
  }

  const { complements, triads } = colorsHelper(hex);
  const { name, onClick, defaultHex } = props;

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
