import styled from "@emotion/styled/macro";

const Template = styled.div`
  color: ${props => props.theme.color};
  background: ${props => props.theme.background};
  font-size: 15px;
  padding: 0 0 0 1.5rem;
  min-height: 100vh;
  transition: background 1s;
  border: 25px solid transparent;
  background-clip: padding-box;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
`;

export default Template;
