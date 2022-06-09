import React from 'react';
import { signOutUser } from '../../supabase/auth';
import GenericButton from './GenericButton';

export default function SignOutButton() {
  return (
    <GenericButton className="btn-danger" iconName="sign-out-alt" onClick={signOutUser} />
  );
}
