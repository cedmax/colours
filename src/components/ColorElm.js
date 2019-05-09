import React, { Fragment, memo } from "react";
import {
  ColorSquare,
  ColorTitle,
  ColorHex,
  ColorDetails,
} from "./ColorElmParts";

const Details = ({ color }) => (
  <ColorDetails>
    {color.name ? (
      <Fragment>
        {color.name}{" "}
        {color.cssName && <ColorTitle>/ {color.cssName} </ColorTitle>}
        <ColorHex>{color.hex}</ColorHex>
      </Fragment>
    ) : (
      <ColorTitle>{color.hex}</ColorTitle>
    )}
  </ColorDetails>
);

export default memo(({ color, onChange }) => (
  <Fragment>
    <ColorSquare hex={color.hex} onClick={() => onChange(color.hex)} />
    <Details color={color} />
  </Fragment>
));
