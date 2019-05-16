import React, { Fragment } from "react";
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

export default ({ color, onClick, forceBorder }) => (
  <Fragment>
    <ColorSquare
      style={{
        background: color.hex,
      }}
      forceBorder={forceBorder}
      hex={color.hex}
      onClick={() => onClick(color.hex)}
    />
    <Details color={color} />
  </Fragment>
);
