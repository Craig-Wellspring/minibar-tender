import React from "react";
import PropTypes from "prop-types";
import SignOutButton from "./buttons/SignOutButton";
import styled from "styled-components";

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
  text-align: center;
  font-size: 18pt;

  border-bottom: 1px solid white;
`;

export default function Header({ session }) {
  return (
    <HeaderBar>
      MinibarTender
      {session ? <SignOutButton /> : null}
    </HeaderBar>
  );
}

Header.propTypes = {
  session: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

Header.defaultProps = {
  session: null,
};
