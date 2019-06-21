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
  background-image: ${({ colors }) =>
    `linear-gradient(to bottom right, ${colors.join(", ")})`};
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
