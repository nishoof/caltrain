"use client";

import { PositionHandler } from "@/lib/PositionHandler";
import { useEffect, useState } from "react";

export default function CaltrainEta() {
  const [cityName, setCityName] = useState("");

  function onPositionUpdate(cityName: string) {
    console.log(`yippee we now at ${cityName}`);
    setCityName(cityName);
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
        <p>{cityName}</p>
        <p>Next: California Avenue</p>
        <p>ETA: 7:19am (3 mins)</p>
        <a href="http://nishilanand.com">Test link</a>
      </main>
    </div >
  );
}
