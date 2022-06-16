import React, { useEffect, useState } from "react";
import { supabase } from "../api/auth";
import Routing from "../routes";
import Header from "./Header";
import SignIn from "./views/SignIn";
import styled from "styled-components";
import { ColumnSection } from "./generics/StyledComponents";

const AppBody = styled(ColumnSection)`
  padding: 20px;
`;

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
      <AppBody>{session ? <Routing /> : <SignIn />}</AppBody>
    </>
  );
}
