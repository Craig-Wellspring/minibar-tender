import React, { useEffect, useState } from 'react';
import Routing from '../routes';
import Header from './Header';
import SignIn from './views/SignIn';

export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
  }, []);

  return (
    <>
      <Header user={user} />
      <hr />
      {user ? (
        <div id="body">
          <Routing />
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
}
