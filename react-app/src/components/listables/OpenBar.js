import React from 'react';
import PropTypes from 'prop-types';
import { currentUser } from '../../supabase/auth';

export default function OpenBar({ barInfo }) {
  function getRoleIcon() {
    let iconName = '';
    if (barInfo.serverKey === currentUser().uid) {
      iconName = 'fa-cash-register';
    } else if (barInfo.stockerKey === currentUser().uid) {
      iconName = 'fa-dolly';
    } else {
      iconName = 'fa-user-alt-slash';
    }
    return iconName;
  }

  function getBarColor() {
    let colorClass = '';
    if (barInfo.stockerOnly) {
      colorClass = barInfo.stockerKey ? 'success' : 'danger';
    } else if (!barInfo.stockerOnly) {
      if (barInfo.serverKey && barInfo.stockerKey) {
        colorClass = 'success';
      } else if (
        (barInfo.serverKey && !barInfo.stockerKey)
        || (!barInfo.serverKey && barInfo.stockerKey)
      ) {
        colorClass = 'warning';
      } else if (!barInfo.serverKey && !barInfo.stockerKey) {
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
