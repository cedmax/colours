import React, { memo } from "react";
import styled from "@emotion/styled/macro";

const Button = styled.button`
  background: rgba(253, 253, 253, 0.9);
  border-radius: 50%;
  width: 2.2rem;
  opacity: 0.1;
  height: 2.2rem;
  border: 0;
  padding: 6px 4px;
  position: relative;
  cursor: pointer;
  transform: rotate(90deg);

  :hover {
    opacity: 1 !important;
  }

  span {
    pointer-events: none;
    position: absolute;
    left: 8px;
    top: 15px;
    font-size: 78%;
    transform: rotate(-90deg);
  }
`;

const Svg = styled.svg`
  pointer-events: none;
  width: 100%;
  height: 100%;
  margin-left: -1px;
`;

export default memo(({ type, title, onMouseOut, onClick, onMouseOver }) => (
  <Button
    onMouseOut={onMouseOut}
    onMouseOver={onMouseOver}
    onClick={onClick}
    type="button"
  >
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.3 488.3">
      <title>Copy {title}</title>
      <path d="M314.25 85.4h-227c-21.3 0-38.6 17.3-38.6 38.6v325.7c0 21.3 17.3 38.6 38.6 38.6h227c21.3 0 38.6-17.3 38.6-38.6V124c-.1-21.3-17.4-38.6-38.6-38.6zm11.5 364.2c0 6.4-5.2 11.6-11.6 11.6h-227c-6.4 0-11.6-5.2-11.6-11.6V124c0-6.4 5.2-11.6 11.6-11.6h227c6.4 0 11.6 5.2 11.6 11.6v325.6z"></path>
      <path d="M401.05 0h-227c-21.3 0-38.6 17.3-38.6 38.6 0 7.5 6 13.5 13.5 13.5s13.5-6 13.5-13.5c0-6.4 5.2-11.6 11.6-11.6h227c6.4 0 11.6 5.2 11.6 11.6v325.7c0 6.4-5.2 11.6-11.6 11.6-7.5 0-13.5 6-13.5 13.5s6 13.5 13.5 13.5c21.3 0 38.6-17.3 38.6-38.6V38.6c0-21.3-17.3-38.6-38.6-38.6z"></path>
    </Svg>
    <span>{type}</span>
  </Button>
));
