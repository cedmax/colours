import React, { memo } from "react";
import ColorElm from "./ColorElm";
import EmptyList from "./EmptyList";
import styled from "@emotion/styled/macro";

export const List = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
`;

export default memo(({ colors, onClick }) =>
  !!colors.length ? (
    <List>
      {colors.map(color => (
        <ListItem key={color.hex}>
          <ColorElm onClick={onClick} color={color} />
        </ListItem>
      ))}
    </List>
  ) : (
    <EmptyList />
  )
);
