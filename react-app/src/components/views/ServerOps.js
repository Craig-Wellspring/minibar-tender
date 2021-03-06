import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOpenBar } from "../../api/data/openBars-data";
import { Break, ColumnSection, Section, Title } from "../generics/StyledComponents";
import GenericButton from "../generics/GenericButton";
import BackButton from "../buttons/BackButton";
import BarSignoutButton from "../buttons/BarSignoutButton";

function ServerOps() {
  const { barID } = useParams();
  const [barInfo, setBarInfo] = useState({});

  useEffect(() => {
    let isMounted = true;
    (async function () {
      const barData = await getOpenBar(barID);
      if (isMounted) {
        setBarInfo(barData);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [barID]);

  return (
    <ColumnSection>
      <Title>Bartender</Title>
      <div>
        Floor: {barInfo.floor} | {String(barInfo.bar_date).substring(5)}
      </div>

      <ColumnSection></ColumnSection>

      <Section id="button-tray">
        <GenericButton
          id="count-button"
          iconName="clipboard-list"
          className="btn-selected"
        />
        <BarSignoutButton barID={barID} role="server" />
        <BackButton />
      </Section>
    </ColumnSection>
  );
}

export default ServerOps;
