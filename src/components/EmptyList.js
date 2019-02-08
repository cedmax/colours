import React from "react";
import styled from "@emotion/styled/macro";

const Title = styled.h3`
  line-height: 5;
  text-align: center;
`;

export default ({ visible }) => visible && <Title>No Result</Title>;
