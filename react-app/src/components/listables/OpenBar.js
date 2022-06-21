import React from "react";
import PropTypes from "prop-types";
import { getCurrentUser } from "../../api/auth";
import styled from "styled-components";
import { Section } from "../generics/StyledComponents";

const OpenBarButton = styled(Section)`
  width: 80%;

  padding: 8px 20px;
  font-size: 24px;
`;

export default function OpenBar({ barInfo, selectBar }) {
  const getRoleIcon = () => {
    const uid = getCurrentUser().id;
    if (barInfo.server_id === uid) {
      return "fa-cash-register";
    }
    if (barInfo.stocker_id === uid) {
      return "fa-dolly";
    }
    return "fa-user-alt-slash";
  };

  const getBarColor = () => {
    let colorClass = "";
    if (barInfo.stocker_only) {
      colorClass = barInfo.stocker_id ? "selected" : "danger";
    } else if (!barInfo.stocker_only) {
      if (barInfo.server_id && barInfo.stocker_id) {
        colorClass = "selected";
      } else if (
        (barInfo.server_id && !barInfo.stocker_id) ||
        (!barInfo.server_id && barInfo.stocker_id)
      ) {
        colorClass = "warning";
      } else if (!barInfo.server_id && !barInfo.stocker_id) {
        colorClass = "danger";
      }
    }
    return colorClass;
  };

  return (
    <OpenBarButton
      type="button"
      onClick={() => {
        selectBar(barInfo);
      }}
      className={`btn-${getBarColor(barInfo)} btn`}
    >
      <i className={`no-click basic-icon fas ${getRoleIcon(barInfo)}`} />
      Floor {barInfo.floor}
    </OpenBarButton>
  );
}

OpenBar.propTypes = {
  barInfo: PropTypes.shape().isRequired,
  selectBar: PropTypes.func.isRequired,
};
