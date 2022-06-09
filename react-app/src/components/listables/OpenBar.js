import React from 'react';
import PropTypes from 'prop-types';
import { currentUser } from '../../api/auth';

export default function OpenBar({ barInfo }) {
  function getRoleIcon() {
    let iconName = '';
    if (barInfo.server_id === currentUser().id) {
      iconName = 'fa-cash-register';
    } else if (barInfo.stocker_id === currentUser().id) {
      iconName = 'fa-dolly';
    } else {
      iconName = 'fa-user-alt-slash';
    }
    return iconName;
  }

  function getBarColor() {
    let colorClass = '';
    if (barInfo.stocker_only) {
      colorClass = barInfo.stocker_id ? 'success' : 'danger';
    } else if (!barInfo.stocker_only) {
      if (barInfo.server_id && barInfo.stocker_id) {
        colorClass = 'success';
      } else if (
        (barInfo.server_id && !barInfo.stocker_id)
        || (!barInfo.server_id && barInfo.stocker_id)
      ) {
        colorClass = 'warning';
      } else if (!barInfo.server_id && !barInfo.stocker_id) {
        colorClass = 'danger';
      }
    }
    return colorClass;
  }

  return (
    <div>
      <button
        type="button"
        className={`open-bar-btn btn btn-outline-${getBarColor(barInfo)}`}
      >
        <i className={`no-click basic-icon fas ${getRoleIcon(barInfo)}`} />
        Floor {barInfo.floor}
      </button>
    </div>
  );
}

OpenBar.propTypes = {
  barInfo: PropTypes.shape().isRequired,
};
