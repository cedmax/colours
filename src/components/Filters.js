import React from "react";
import styled from "@emotion/styled/macro";

const Small = styled.span`
  font-size: 70%;
`;

const Title = styled.span`
  opacity: ${props => props.theme.lightOpacity};
  margin-left: 0.5rem;
`;

export default ({ sortBy, filter, currentFilter }) => (
  <Small>
    <Title>Sort by: </Title>
    <select onChange={sortBy}>
      <option value="name">Name</option>
      <option value="hue">Hue</option>
      <option value="hex">Hex</option>
    </select>
    <Title>Filter: </Title>
    <input
      onChange={filter}
      style={{ width: 70 }}
      type="text"
      value={currentFilter}
    />
  </Small>
);
