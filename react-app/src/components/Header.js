import React from 'react';
import PropTypes from 'prop-types';
import SignOutButton from './buttons/SignOutButton';

export default function Header({ user }) {
  return (
    <div id="headerContainer">
      <div id="header">Drink Stocker</div>
      {user ? <SignOutButton /> : null}
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

Header.defaultProps = {
  user: null,
};
