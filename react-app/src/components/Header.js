import React from 'react';
import PropTypes from 'prop-types';
import SignOutButton from './buttons/SignOutButton';

export default function Header({ session }) {
  return (
    <div id="headerContainer">
      <div id="header">Drink Stocker</div>
      {session ? <SignOutButton /> : null}
    </div>
  );
}

Header.propTypes = {
  session: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

Header.defaultProps = {
  session: null,
};
