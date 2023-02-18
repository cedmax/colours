import React, { memo } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import ColorElm from "./ColorElm";
import EmptyList from "./EmptyList";
import styled from "@emotion/styled/macro";

export const InnerLI = styled.li`
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
`;

const Li = memo(({ color, onClick, style: { height, ...style } }) => (
  <InnerLI style={{ ...style }}>
    <ColorElm onClick={onClick} color={color} />
  </InnerLI>
));

export default memo(({ colors, onClick }) => {
  return !!colors.length ? (
    <AutoSizer style={{ width: "100%" }}>
      {({ height, width }) => (
        <Grid
          columnCount={Math.floor((width - 50) / 230)}
          columnWidth={230}
          rowCount={Math.ceil(colors.length / Math.floor((width - 50) / 230))}
          rowHeight={230}
          width={width - Math.ceil(width % 230) + 15}
          height={height - 145}
          itemCount={colors.length + 20}
          innerElementType="ol"
          style={{
            boxSizing: "border-box",
            willChange: "transform",
            listStyle: "none",
            padding: "0 1.5rem 1.5rem 0",
            margin: "0 auto",
            transform: "translate(-.5rem)",
            overflowX: "hidden",
          }}
        >
          {({ style, rowIndex, columnIndex }, i) => {
            const idx = rowIndex * 4 + columnIndex;
            const color = colors[idx];
            return color ? (
              <Li
                color={color}
                onClick={onClick}
                key={color.hex}
                style={style}
              />
            ) : (
              <li key={idx} className="filler"></li>
            );
          }}
        </Grid>
      )}
    </AutoSizer>
  ) : (
    <EmptyList />
  );
});
