import React, { Fragment, memo, useState, useCallback, useEffect } from "react";
import copy from "copy-to-clipboard";
import Button from "./Icon";

import {
  ColorSquare,
  ColorTitle,
  ColorDetails,
  ColorButtons,
  ColorText
} from "./ColorElmParts";

const copiedText = "copied!";

const ColorButton = memo(({ updateText, text, type, value }) => {
  const onMouseOver = useCallback(() => {
    updateText(value);
  }, [updateText, value]);

  const onMouseOut = useCallback(() => {
    if (copiedText !== text) {
      updateText("");
    }
  }, [updateText, text]);

  const onClick = useCallback(
    e => {
      copy(value);
      e.stopPropagation();
      updateText(copiedText);
    },
    [updateText, value]
  );

  return (
    <Button
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
      type={type}
      title={value}
    />
  );
});

const Details = memo(({ color }) => (
  <ColorDetails>
    {color.name ? (
      <Fragment>
        {color.name}{" "}
        {color.cssName && <ColorTitle>/ {color.cssName} </ColorTitle>}
      </Fragment>
    ) : (
      <ColorTitle>{color.hex}</ColorTitle>
    )}
  </ColorDetails>
));

export default memo(({ color, onClick, forceBorder }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (copiedText === text) {
      setTimeout(() => setText(""), 5000);
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
        {text && <ColorText color={color.hex}>{text}</ColorText>}

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
