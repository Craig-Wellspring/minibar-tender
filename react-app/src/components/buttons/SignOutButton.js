import React from 'react';
import { signOutUser } from '../../api/auth';
import GenericButton from '../generics/GenericButton';

export default function SignOutButton() {
  return (
    <GenericButton className="btn-danger" iconName="sign-out-alt" onClick={signOutUser} />
  );
}
