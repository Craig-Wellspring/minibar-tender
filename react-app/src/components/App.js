import React, { useEffect, useState } from 'react';
import { supabase } from '../api/auth';
import Routing from '../routes';
import Header from './Header';
import SignIn from './views/SignIn';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((e, _session) => {
      setSession(_session);
    });
  }, []);

  return (
    <>
      <Header session={session} />
      {session ? (
        <div id="body">
          <Routing />
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
}
