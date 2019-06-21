import React, { memo } from "react";
import styled from "@emotion/styled/macro";
import ColorElm from "./ColorElm";
import { List } from "./List";

export const ListColours = memo(({ list, onClick }) => (
  <List>
    {list.map(hex => (
      <li key={hex}>
        <ColorElm forceBorder onClick={onClick} color={{ hex }} />
      </li>
    ))}
  </List>
));

export const Columns = styled.div`
  columns: 2;
  column-gap: 50;
`;

export const SectionTitle = styled.h4`
  margin-top: 0;
`;
