import styled from "@emotion/styled/macro";

const Template = styled.div`
  background: #fff;
  background-size: 21px 21px;
  background-position: 0 0, 10px 10px;
  background-image: linear-gradient(
      45deg,
      #f3f3f3 25%,
      transparent 0,
      transparent 75%,
      #f3f3f3 0,
      #f3f3f3
    ),
    linear-gradient(
      45deg,
      #f3f3f3 25%,
      transparent 0,
      transparent 75%,
      #f3f3f3 0,
      #f3f3f3
    );
  font-size: 15px;
  padding: 0 0 0 1.5rem;
  min-height: 100vh;
  transition: background 1s;
  border: 25px solid transparent;
  background-clip: padding-box;
  height: 100%;
  position: absolute;
  width: 100%;
`;

export default Template;
