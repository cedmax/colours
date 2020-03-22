import styled from "@emotion/styled/macro";
import a11ycolor from "a11ycolor";

export const ColorSquare = styled.span`
  display: inline-block;
  width: 100%;
  padding-top: 100%;
  margin-right: 5px;
  vertical-align: middle;
  cursor: pointer;
  transition: border 1s;
`;

export const ColorTitle = styled.em`
  opacity: ${props => props.theme.opacity};
`;

export const ColorHex = styled.em`
  opacity: ${props => props.theme.opacity};
  font-size: 80%;
  display: block;

  span {
    display: inline-block;
    font-style: normal;
    font-size: 105%;
  }
`;

export const ColorDetails = styled.span`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.3rem;
  background: rgba(253, 253, 253, 0.9);
  display: inline-block;
  vertical-align: middle;
  line-height: 1.2;
  height: 2.75rem;
  top: 0;
  position: absolute;
  border-bottom: 3px solid #000;
`;

export const ColorButtons = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  padding: 0.3rem;
  border: 0;
  width: 100%;
  justify-content: space-between;
`;

export const ColorText = styled.div`
  color: ${p => a11ycolor(p.color, p.color)};
  position: absolute;
  top: calc(50% + 1.35rem);
  transform: translateY(-50%);
  text-align: center;
  width: 100%;
  padding: 0 0.5rem;
  white-space: normal;
  span {
    white-space: pre;
  }
`;
