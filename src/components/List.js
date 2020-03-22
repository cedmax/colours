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
  .filler {
    height: 0;
    border: 0;
    margin-bottom: 0;
    padding: 0;
  }
`;

const Li = memo(({ color, onClick }) => (
  <li>
    <ColorElm onClick={onClick} color={color} />
  </li>
));

const Filler = memo(() =>
  [...Array(20)].map((a, i) => <li key={i} className="filler"></li>)
);

export default memo(({ colors, onClick }) =>
  !!colors.length ? (
    <ListWrapper>
      <List>
        {colors.map(color => (
          <Li color={color} onClick={onClick} key={color.hex} />
        ))}
        <Filler />
      </List>
    </ListWrapper>
  ) : (
    <EmptyList />
  )
);
