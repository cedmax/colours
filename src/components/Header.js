import React, { memo } from "react";
import styled from "@emotion/styled/macro";

const Em = styled.em`
  opacity: ${props => props.theme.opacity};
`;

const Header = styled.header`
  max-width: 300px;
`;

const Small = styled.span`
  font-size: 80%;
  display: block;
`;

export default memo(({ children }) => (
  <Header>
    <h2>
      Colour Name <Em>/ Css Name</Em>
      <Small>
        <Em>#Hex</Em> {children}
      </Small>
    </h2>
  </Header>
));
