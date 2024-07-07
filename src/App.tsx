// import { useState } from "react";
import "./App.css";
// import ChooseTransportMode from "./components/ChooseTransportMode";
// import ModeStopPoints from "./components/ModesStopPoints";
// import StationArrivals from "./components/StationArrivals";
// import AllTransport from "./components/AllTransport";
// import OneTransport from "./components/OneTransport";
import SidebarNav from "./components/SidebarNav";
import ArrivalsPage from "./components/arrivals/ArrivalsPage";
// import GetAllTube from "./components/GetAllTube";

const App = () => {
  // const [transportModeName, setTransportModeName] = useState<string>("dlr");
  // const [stationId, setStationId] = useState<string>("940GZZDLSOQ");

  return (
    // <>
    //   <div>Choose Mode</div>
    //   <ChooseTransportMode
    //     onTransportModeNameClick={(transportModeName) => {
    //       setTransportModeName(transportModeName);
    //     }}
    //   />
    //   <ModeStopPoints
    //     onNaptanIdClick={(naptanId) => setStationId(naptanId)}
    //     transportMode={transportModeName}
    //   />
    //   <StationArrivals stationId={stationId} />
    //   <AllTransport />
    //   <OneTransport tubeId="940GZZLUKSX" />
    // </>
    <div className="flex w-full h-full">
      <div className="min-w-[300px] h-full">
        <SidebarNav />
      </div>
      <div className="flex-auto p-4">
        <ArrivalsPage />
      </div>
    </div>
  );
};

export default App;
