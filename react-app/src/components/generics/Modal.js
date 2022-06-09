import React from "react";
import PropTypes from "prop-types";
import CloseModalButton from "../buttons/CloseModalButton";
import GenericButton from "./GenericButton";
import { Section, ColumnSection } from "./StyledComponents";
import styled from "styled-components";

const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
`;

const ModalBody = styled(ColumnSection)`
  background-color: black;
  position: absolute;
  top: calc(50% - 130px);
  height: 260px;
  left: 10%;
  width: 80%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 20px 0px;
  border-radius: 4px;
`;

function Modal({ closeModal, submitModal }) {
  return (
    <>
      <Blur onClick={closeModal} />
      <ModalBody>
        Modal content
        <Section>
          <CloseModalButton closeModal={closeModal} />
          <GenericButton
            id="modalSubmitBtn"
            iconName="check"
            className="btn-selected"
            onClick={submitModal}
          />
        </Section>
      </ModalBody>
    </>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  submitModal: PropTypes.func,
};

Modal.defaultProps = {
  submitModal: () => {},
};

export default Modal;
