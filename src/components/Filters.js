import React, { useEffect, useRef, memo, useState } from "react";
import styled from "@emotion/styled/macro";
import ColorRangePicker from "color-range-picker";

const uCase = string => {
  return string && string.charAt(0).toUpperCase() + string.slice(1);
};

const Small = styled.span`
  font-size: 70%;
`;

const Title = styled.span`
  opacity: ${props => props.theme.lightOpacity};
  margin-left: 0.5rem;

  &:first-of-type {
    margin-left: 0;
  }

  & span {
    text-decoration: ${props => (!!props.onClick ? "underline" : "none")};
    cursor: ${props => (!!props.onClick ? "pointer" : "default")};
  }
`;

const background = `rgba(0,0,0,.3)`;

const Circle = styled.span`
  position: relative;
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1px solid ${background};
  background-color: ${background};
  vertical-align: middle;
  margin: 0 5px;

  & canvas {
    z-index: 1;
  }
`;

const CenterVertically = styled.span`
  margin-top: 5px;
  margin-left: 0.5rem;
  align-items: center;
  display: inline-flex;
  ${Circle} + ${Title} {
    margin-left: 0;
  }
`;

export default memo(({ reset, sortBy, ranges, filterRange }) => {
  const colorPickerElm = useRef(null);
  const [rangeSelection, setRangeSelection] = useState("");

  useEffect(() => {
    new ColorRangePicker({
      parent: colorPickerElm.current,
      target: colorPickerElm.current,
      colors: ranges.map(({ hex }) => hex),
      onPick: instance => {
        const filter =
          (ranges.find(range => range.hex === instance.hex) || {}).name ||
          "gray";
        filterRange(filter);
        setRangeSelection(filter);
        reset();
      },
    });
  }, [colorPickerElm]);

  return (
    <Small>
      <Title>Sort by: </Title>
      <select onChange={sortBy}>
        <option value="name">Name</option>
        <option value="hue">Hue</option>
        <option value="hex">Hex</option>
        <option value="lig">Lig</option>
        <option value="sat">Sat</option>
      </select>
      <CenterVertically>
        <Title>Hue: </Title>
        <Circle ref={colorPickerElm} />
        {rangeSelection && (
          <Title
            onClick={() => {
              filterRange();
              setRangeSelection("");
              colorPickerElm.current.style.background = background;
            }}
          >
            {uCase(rangeSelection)} <span>x</span>
          </Title>
        )}
      </CenterVertically>
    </Small>
  );
});
