import React, { memo, useState, useEffect } from "react";
import styled from "@emotion/styled/macro";

const Bar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  margin: -25px;
  border-radius: inherit;
  background: #fff;
  background-size: ${({ colors }) => (colors.length > 1 ? "" : `21px 21px`)};
  background-position: ${({ colors }) =>
    colors.length > 1 ? "" : `0 0, 10px 10px`};
  background-image: ${({ colors }) =>
    colors.length > 1
      ? `linear-gradient(to bottom right, ${colors.join(", ")})`
      : `linear-gradient(
        45deg,
        #f3f3f3 25%,
        transparent 0,
        transparent 75%,
        #f3f3f3 0,
        #f3f3f3
      ),
      linear-gradient(
        45deg,
        #f3f3f3 25%,
        transparent 0,
        transparent 75%,
        #f3f3f3 0,
        #f3f3f3
      );`};
`;

export default memo(({ color }) => {
  const [colors, setColors] = useState([color]);

  useEffect(() => {
    setColors(colors =>
      !colors.includes(color) ? [...colors, color] : colors
    );
  }, [color]);

  return <Bar colors={colors} />;
});
