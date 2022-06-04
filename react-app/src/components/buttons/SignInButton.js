import React from 'react';
import { signInUser } from '../../supabase/auth';

export default function SignInButton() {
  return (
    <button type="button" className="btn btn-success" onClick={signInUser}>
      Sign In
    </button>
  );
}
