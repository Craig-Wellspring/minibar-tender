import React from 'react';
import PropTypes from 'prop-types';

export default function Title({ title }) {
  return <div id="title">{title}</div>;
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};
