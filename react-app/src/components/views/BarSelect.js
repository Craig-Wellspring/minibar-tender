import React, { useState, useEffect } from 'react';
import { getOpenBars } from '../../supabase/data/openBars-data';
import NewBarButton from '../buttons/NewBarButton';
import OpenBar from '../listables/OpenBar';
import Title from '../Title';

export default function BarSelect() {
  const [openBarsState, setOpenBarsState] = useState([]);

  useEffect(() => {
    (async function() {
      let openBars = await getOpenBars();
      setOpenBarsState(openBars.data);
    })();
  }, []);

  return (
    <>
      <Title title="Bar Select" />
      <div id="openBarsContainer">
        {openBarsState.map((openBar) => (
          <OpenBar key={openBar.id} barInfo={openBar} />
        ))}
      </div>
      <NewBarButton />
    </>
  );
}
