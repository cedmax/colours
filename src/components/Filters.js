import React, { memo } from "react";
import styled from "@emotion/styled/macro";

const Small = styled.span`
  font-size: 70%;
`;

const Title = styled.span`
  opacity: ${props => props.theme.lightOpacity};
  margin-left: 10px;
`;

export default memo(({ sortBy, filter, currentFilter, currentSortBy }) => (
  <Small>
    <Title>Sort by: </Title>
    <select value={currentSortBy} onChange={e => sortBy(e.target.value)}>
      <option value="name">Name</option>
      <option value="hue">Hue</option>
      <option value="hex">Hex</option>
    </select>
    <Title>Filter: </Title>
    <input
      onChange={e => filter(e.target.value)}
      style={{ width: 70 }}
      type="text"
      value={currentFilter}
    />
  </Small>
));
