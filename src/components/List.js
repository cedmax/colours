import React, { memo } from "react";
import ColorElm from "./ColorElm";
import EmptyList from "./EmptyList";
import styled from "@emotion/styled/macro";

const ListWrapper = styled.div`
  width: 100%;
  overflow: scroll;
  height: calc(100% - 95px);
`;

export const List = styled.ol`
  list-style: none;
  padding: 0 0 1.5rem;
  margin: 0;
  columns: 300px 3;

  & > li {
    margin-bottom: 10px;
    white-space: pre;
  }
`;

export default memo(({ colors, onClick }) =>
  !!colors.length ? (
    <ListWrapper>
      <List>
        {colors.map(color => (
          <li key={color.hex}>
            <ColorElm onClick={onClick} color={color} />
          </li>
        ))}
      </List>
    </ListWrapper>
  ) : (
    <EmptyList />
  )
);
