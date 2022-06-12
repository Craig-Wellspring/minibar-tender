import React from "react";
import PropTypes from "prop-types";
import CloseModalButton from "../buttons/CloseModalButton";
import GenericButton from "./GenericButton";
import { Section, ColumnSection, Break } from "./StyledComponents";
import styled from "styled-components";

const Blur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
`;

const ModalBody = styled(ColumnSection)`
  background-color: black;
  position: absolute;
  top: calc(20%);
  left: 10%;
  width: 80%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 20px 0px;
  border-radius: 4px;
`;

function Modal({ modalContent, closeModal, submitModal, submitIcon, submitClass }) {
  return (
    <>
      <Blur onClick={closeModal} />
      <ModalBody>
        {modalContent}
        <Break />
        <Section>
          <GenericButton
            id="modalSubmitBtn"
            iconName={submitIcon}
            className={submitClass}
            onClick={submitModal}
          />
          <CloseModalButton closeModal={closeModal} />
        </Section>
      </ModalBody>
    </>
  );
}

Modal.propTypes = {
  modalContent: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  submitModal: PropTypes.func,
  submitIcon: PropTypes.string,
  submitClass: PropTypes.string,
};

Modal.defaultProps = {
  submitModal: () => {},
  submitIcon: "check",
  submitClass: "btn-selected"
};

export default Modal;
