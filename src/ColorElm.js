import React, { Fragment } from "react";

export default ({ hex, name, cssName, style, onClick, forceBorder }) => (
  <Fragment>
    <span
      onClick={() => style.background !== hex && onClick(hex)}
      style={{
        display: "inline-block",
        background: hex,
        width: 30,
        height: 30,
        border:
          hex === style.background && !forceBorder
            ? `1px solid ${hex}`
            : "1px solid #000",
        marginRight: 5,
        verticalAlign: "top",
        cursor: onClick ? "pointer" : "auto",
      }}
    />
    <span
      style={{
        display: "inline-block",
        verticalAlign: "top",
        lineHeight: 1.2,
      }}
    >
      {name ? (
        <Fragment>
          {name}{" "}
          {cssName && <em style={{ opacity: style.opacity }}>/ {cssName} </em>}
          <em
            style={{
              opacity: style.opacity,
              fontVariant: "small-caps",
              fontSize: "80%",
              display: "block",
            }}
          >
            {hex}
          </em>
        </Fragment>
      ) : (
        hex
      )}
    </span>
  </Fragment>
);
