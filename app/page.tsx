"use client";

import { PositionHandler } from "@/lib/PositionHandler";
import { StationName } from "@/lib/Stations";
import { useEffect, useState } from "react";

export default function CaltrainEta() {
  const [train, setTrain] = useState<string | null>(null);
  const [closestStation, setClosestStation] = useState<{ name: StationName; distance: number } | null>(null);
  const [nextStation, setNextStation] = useState<StationName | null>(null);

  function onPositionUpdate(positionHandler: PositionHandler) {
    const closestStation = positionHandler.getClosestStation();
    if (!closestStation) {
      console.warn("Couldn't determine closest station.");
      setClosestStation(null);
      return;
    }
    setClosestStation({ name: closestStation.name, distance: closestStation.distance });
  }

  useEffect(() => {
    const positionHandler = PositionHandler.getInstance();
    positionHandler.setPositionListener(onPositionUpdate);
    positionHandler.setTrainListener(setTrain);
    positionHandler.setNextStationListener(setNextStation);
  }, []);

  return (
    <div className="page">
      <main className="main">
        <h1>caltrain eta</h1>

        {closestStation ?
          <>
            <p>{train || "Train Unknown"}</p>
            <p>Closest Station: {closestStation.name} ({closestStation.distance.toFixed(2)} miles away)</p>
            <p>Next: {nextStation || "Unknown"}</p>
            <p>ETA: 7:19am (3 mins)</p>
          </>
          :
          <p>Please allow location access</p>
        }
      </main>
    </div >
  );
}
