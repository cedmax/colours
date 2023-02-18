import React from "react";
import ReactLoading from "react-loading";
import styled from "@emotion/styled/macro";

export const Wrapper = styled.span`
  position: absolute;
  background: rgba(255, 255, 255, 0.4);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Loader = () => (
  <Wrapper>
    <ReactLoading
      type="bubbles"
      color="rgba(0,0,0,.8)"
      width={100}
      height={100}
    />
  </Wrapper>
);

export default Loader;
