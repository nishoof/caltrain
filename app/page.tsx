"use client";

import { PositionHandler } from "@/lib/PositionHandler";
import { useEffect, useState } from "react";

export default function CaltrainEta() {
  const [cityName, setCityName] = useState<string | null>(null);

  function onPositionUpdate(positionHandler: PositionHandler) {
    const lastKnownPosition = positionHandler.getLastKnownPosition();
    if (!lastKnownPosition) {
      console.warn("No last known position available.");
      setCityName("Unknown location");
      return;
    }

    const closestStation = positionHandler.getClosestStation();
    if (!closestStation) {
      console.warn("Couldn't determine closest station.");
      setCityName("Couldn't determine closest station.");
      return;
    }

    setCityName(`${closestStation.name} (${closestStation.distance.toFixed(2)} miles away)`);
  }

  useEffect(() => {
    const positionHandler = PositionHandler.getInstance();
    positionHandler.setPositionListener(onPositionUpdate);
  }, []);

  return (
    <div className="page">
      <main className="main">
        <h1>caltrain eta</h1>
        <p>Train 109</p>
        {cityName ? <p>Closest Station: {cityName}</p> : <p>Unknown location</p>}
        <p>Next: California Avenue</p>
        <p>ETA: 7:19am (3 mins)</p>
        <a href="http://nishilanand.com">Test link</a>
      </main>
    </div >
  );
}
