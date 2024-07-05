import { useState } from "react";
import "./App.css";
import ChooseTransportMode from "./components/ChooseTransportMode";
import ModeStopPoints from "./components/ModesStopPoints";
import StationArrivals from "./components/StationArrivals";
import AllTransport from "./components/AllTransport";
import OneTransport from "./components/OneTransport";
// import GetAllTube from "./components/GetAllTube";

const App = () => {
  const [transportModeName, setTransportModeName] = useState<string>("dlr");
  const [stationId, setStationId] = useState<string>("940GZZDLSOQ");

  return (
    <>
      <div>Choose Mode</div>
      <ChooseTransportMode
        onTransportModeNameClick={(transportModeName) => {
          setTransportModeName(transportModeName);
        }}
      />
      <ModeStopPoints
        onNaptanIdClick={(naptanId) => setStationId(naptanId)}
        transportMode={transportModeName}
      />
      <StationArrivals stationId={stationId} />
      <AllTransport />
      <OneTransport tubeId="940GZZLUKSX" />
    </>
  );
};

export default App;
