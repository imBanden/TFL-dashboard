// import { useState } from "react";
import "./App.css";
// import ChooseTransportMode from "./components/ChooseTransportMode";
// import ModeStopPoints from "./components/ModesStopPoints";
// import StationArrivals from "./components/StationArrivals";
// import AllTransport from "./components/AllTransport";
// import OneTransport from "./components/OneTransport";
import SidebarNav from "./components/SidebarNav";
import ArrivalsPage from "./components/arrivals/ArrivalsPage";
import MaterialSymbolsMenu from "./icons/MaterialSymbolsMenu";
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
    <div className="flex w-full h-full overflow-hidden">
      <div className="md:min-w-[300px] h-full hidden md:flex">
        <SidebarNav />
      </div>
      <div className="flex flex-col flex-auto basis-full p-4 gap-4">
        <div className="flex gap-4 items-center">
          <MaterialSymbolsMenu className="w-6 h-6 cursor-pointer" />
          <p className="text-black text-lg">isMyTFLhere.com</p>
        </div>
        <ArrivalsPage />
      </div>
    </div>
  );
};

export default App;
