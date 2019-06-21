import React, { memo } from "react";
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
    right: 25,
    bottom: 25,
    overflow: "visible",
    border: 0,
    borderRadius: 0,
    padding: "30px 25px 20px",
    boxSizing: "border-box",
    maxWidth: "calc(100% - 50px)",
    width: 310,
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
  left: -10px;
  text-align: center;
  top: -10px;
  width: 25px;
  line-height: 20px;
`;

const ModalContent = styled.div`
  font-size: 97%;

  & h2 {
    margin-top: 0;
  }

  & h4 {
    margin-bottom: 0.5rem;
  }
`;

export default memo(({ title, children, close }) => (
  <Modal isOpen={true} style={modalStyle} contentLabel={title}>
    <ModalContent>{children}</ModalContent>
    <CloseButton onClick={close}>x</CloseButton>
  </Modal>
));
