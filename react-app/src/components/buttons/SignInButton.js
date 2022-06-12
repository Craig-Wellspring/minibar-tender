import React from 'react';
import { signInUser } from '../../api/auth';
import GenericButton from '../generics/GenericButton';

export default function SignInButton() {
  return (
    <GenericButton className="btn-selected" iconName="sign-in-alt" onClick={signInUser} />
  );
}
