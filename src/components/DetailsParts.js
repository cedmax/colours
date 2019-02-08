import React from "react";
import styled from "@emotion/styled/macro";
import ColorElm from "./ColorElm";
import { List, ListItem } from "./List";

export const ListColours = ({ list, onClick }) => (
  <List>
    {list.map(hex => (
      <ListItem key={hex}>
        <ColorElm forceBorder onClick={onClick} color={{ hex }} />
      </ListItem>
    ))}
  </List>
);

export const Columns = styled.div`
  columns: 2;
  column-gap: 50;
`;

export const SectionTitle = styled.h4`
  margin-top: 0;
`;
