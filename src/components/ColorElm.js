import React, { Fragment, memo, useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import Button from "./Icon";

import {
  ColorSquare,
  ColorTitle,
  ColorHex,
  ColorDetails,
  ColorButtons,
  ColorText
} from "./ColorElmParts";

const ColorButton = ({ updateText, text, type, value }) => (
  <Button
    onMouseOver={() => {
      updateText(`copy <span>${value}</span>`);
    }}
    onMouseOut={() => {
      if (copiedText !== text) {
        updateText("");
      }
    }}
    onClick={e => {
      copy(value);
      e.stopPropagation();
      updateText(copiedText);
    }}
    type={type}
    title={value}
  />
);

const Details = ({ color }) => (
  <ColorDetails>
    {color.name ? (
      <Fragment>
        {color.name}{" "}
        {color.cssName && <ColorTitle>/ {color.cssName} </ColorTitle>}
        <ColorHex>
          {color.hex} <span>/</span> <span>{color.rgb}</span>
        </ColorHex>
      </Fragment>
    ) : (
      <ColorTitle>{color.hex}</ColorTitle>
    )}
  </ColorDetails>
);

const copiedText = "copied!";

export default memo(({ color, onClick, forceBorder }) => {
  const [text, setText] = useState("");
  useEffect(() => {
    if (copiedText === text) {
      setTimeout(() => setText(""), 2000);
    }
  }, [text]);
  return (
    <Fragment>
      <ColorSquare
        style={{
          background: color.hex
        }}
        forceBorder={forceBorder}
        hex={color.hex}
        onClick={() => onClick(color.hex, color.name)}
      >
        {text && (
          <ColorText
            dangerouslySetInnerHTML={{ __html: text }}
            color={color.hex}
          />
        )}
        <ColorButtons>
          <ColorButton
            updateText={setText}
            text={text}
            type="hex"
            value={color.hex}
          />
          <ColorButton
            updateText={setText}
            text={text}
            type="rgb"
            value={color.rgb}
          />
        </ColorButtons>
      </ColorSquare>
      <Details color={color} />
    </Fragment>
  );
});
