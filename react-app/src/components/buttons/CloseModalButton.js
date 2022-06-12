import React from "react";
import PropTypes from "prop-types";
import GenericButton from "../generics/GenericButton";

function CloseModalButton({ closeModal }) {
  return (
    <GenericButton
      className="btn-danger"
      iconName="times"
      onClick={closeModal}
    />
  );
}

CloseModalButton.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CloseModalButton;
