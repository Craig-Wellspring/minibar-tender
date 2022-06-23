import React from "react";
import PropTypes from "prop-types";
import CloseModalButton from "../buttons/CloseModalButton";
import GenericButton from "./GenericButton";
import { Section, ColumnSection, Title, Label } from "./StyledComponents";
import styled from "styled-components";

const Blur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(40, 40, 40, 0.2);
  backdrop-filter: blur(8px);
`;

const ModalBody = styled(ColumnSection)`
  position: absolute;
  top: 40px;
  left: 5%;
  width: 90%;
  justify-content: space-between;

  padding: 20px 0px;
  border-radius: 12px;
`;

function Modal({
  title,
  modalContent,
  closeModal,
  submitModal,
  submitIcon,
  submitClass,
  errorText,
}) {
  return (
    <>
      <Blur onClick={closeModal} />
      <ModalBody id="modal">
        <Title>{title}</Title>
        <hr />
        <div style={{ width: "90%" }}>{modalContent}</div>
        <hr />
        <Label className="red-text">{errorText}</Label>
        <Section>
          <CloseModalButton closeModal={closeModal} />
          <GenericButton
            id="modalSubmitBtn"
            iconName={submitIcon}
            className={submitClass}
            onClick={submitModal}
          />
        </Section>
      </ModalBody>
    </>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  modalContent: PropTypes.object.isRequired,
  closeModal: PropTypes.func,
  submitModal: PropTypes.func,
  submitIcon: PropTypes.string,
  submitClass: PropTypes.string,
  errorText: PropTypes.string,
};

Modal.defaultProps = {
  closeModal: () => {},
  submitModal: () => {},
  submitIcon: "check",
  submitClass: "btn-selected",
  errorText: "",
};

export default Modal;
