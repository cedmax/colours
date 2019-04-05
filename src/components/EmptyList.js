import React, { memo } from "react";
import styled from "@emotion/styled/macro";

const Title = styled.h3`
  line-height: 5;
  text-align: center;
`;

export default memo(() => <Title>No Result</Title>);
