import React, { memo } from "react";
import styled from "@emotion/styled/macro";
import ColorElm from "./ColorElm";
import EmptyList from "./EmptyList";

const List = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

export default memo(({ colors, onChange }) =>
  colors.length ? (
    <List>
      {colors.map(color => (
        <ListItem key={color.hex}>
          <ColorElm onChange={onChange} color={color} />
        </ListItem>
      ))}
    </List>
  ) : (
    <EmptyList />
  )
);
