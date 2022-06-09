import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  font-size: 130%;
`;

export default function Title({ title }) {
  return <Container>{title}</Container>;
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};
