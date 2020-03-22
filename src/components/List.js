import React, { memo } from "react";
import ColorElm from "./ColorElm";
import EmptyList from "./EmptyList";
import styled from "@emotion/styled/macro";

const ListWrapper = styled.div`
  width: 100%;
  overflow: hidden auto;
  height: calc(100% - 95px);
`;

export const List = styled.ol`
  list-style: none;
  padding: 0 1.5rem 1.5rem 0;
  margin: 0;
  margin-left: -0.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &::after {
    content: "";
    flex-grow: 1;
  }

  & > li {
    flex-direction: column-reverse;
    margin-bottom: 10px;
    border: 3px solid #000;
    margin-left: 0.5rem;
    min-width: 135px;
    max-width: 220px;
    display: flex;
    flex: 1 1 20%;
    position: relative;

    &:hover button {
      opacity: 0.5;
    }
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
