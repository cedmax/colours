import styled from "@emotion/styled/macro";

export const ColorSquare = styled.span`
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid #000;
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
  font-variant: small-caps;
  font-size: 80%;
  display: block;
`;

export const ColorDetails = styled.span`
  display: inline-block;
  vertical-align: middle;
  line-height: 1.2;
`;
