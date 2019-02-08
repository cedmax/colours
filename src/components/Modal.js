import React from "react";
import Modal from "react-modal";
import styled from "@emotion/styled/macro";

const modalStyle = {
  overlay: {
    background: "transparent",
    pointerEvents: "none",
  },
  content: {
    pointerEvents: "all",
    background: "rgba(255, 255, 255, .9)",
    top: "auto",
    left: "auto",
    right: 20,
    bottom: 20,
    overflow: "visible",
    border: 0,
  },
};

const CloseButton = styled.button`
  background: #666;
  border-radius: 50px;
  border: 1px solid #666;
  color: #fff;
  cursor: pointer;
  height: 25px;
  position: absolute;
  right: -10px;
  text-align: center;
  top: -10px;
  width: 25px;
`;

export default ({ title, children, close }) => (
  <Modal isOpen={true} style={modalStyle} contentLabel={title}>
    {children}
    <CloseButton onClick={close}>x</CloseButton>
  </Modal>
);
