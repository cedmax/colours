import styled from "@emotion/styled/macro";

const Template = styled.div`
  color: ${props => props.theme.color};
  background: ${props => props.theme.background};
  columns: 300px 3;
  font-size: 15px;
  padding: 0.5rem;
  min-height: 100vh;
`;

export default Template;
