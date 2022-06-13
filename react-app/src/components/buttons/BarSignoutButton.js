import React, { useState } from "react";
import PropTypes from "prop-types";
import GenericButton from "../generics/GenericButton";
import { updateBar } from "../../api/data/openBars-data";
import { useNavigate } from "react-router-dom";

function BarSignoutButton({ barID, role }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <GenericButton
      id="logout-button"
      iconName={isLoading ? "spinner fa-spin" : "sign-out-alt"}
      className="btn-warning"
      onClick={() => {
        (async function () {
          setIsLoading(true);
          await updateBar(barID, {
            [role + "_id"]: null,
            [role + "_name"]: null,
          });
          navigate("/barselect");
        })();
      }}
    />
  );
}

BarSignoutButton.propTypes = {
  role: PropTypes.string.isRequired,
};

export default BarSignoutButton;
