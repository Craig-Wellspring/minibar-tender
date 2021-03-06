import React from "react";
import PropTypes from "prop-types";
import SignOutButton from "./buttons/SignOutButton";
import styled from "styled-components";
import SignInButton from "./buttons/SignInButton";

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
  text-align: center;
  font-size: 18pt;
`;

export default function Header({ session }) {
  return (
    <>
      <HeaderBar id="header">
        MinibarTender
        {session ? <SignOutButton /> : <SignInButton />}
      </HeaderBar>
      <hr />
    </>
  );
}

Header.propTypes = {
  session: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

Header.defaultProps = {
  session: null,
};
