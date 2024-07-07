import { useEffect, useState } from "react";
import ArrivalBoard from "./ArrivalBoard";
import StationWidget from "./StationWidget";
import filterStations from "../utils/filterStations";
import formatStationName from "../utils/formatStationName";
import removeBus from "../utils/removeBus";

// interface stationsProps {
//   name: string;
//   lines: string[];
// }

interface StopPoint {
  stopType: string;
  commonName: string;
  lines: { id: string }[];
  lineModeGroups: { modeName: string }[];
  naptanId: string;
}

const ArrivalsPage = () => {
  const [stationClicked, setStationClicked] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [stopPointData, setStopPointData] = useState<StopPoint[]>([]);
  const [stationId, setStationId] = useState<string>("940GZZDLCGT");

  //   const stations: stationsProps[] = [
  //     {
  //       name: "Waterloo & City",
  //       lines: ["bakerloo", "northern", "waterloo-city"],
  //     },
  //     {
  //       name: "King's Cross St. Pancras",
  //       lines: [
  //         "circle",
  //         "hammersmith-city",
  //         "metropolitan",
  //         "northern",
  //         "piccadilly",
  //         "victoria",
  //       ],
  //     },
  //     {
  //       name: "Oxford Circus",
  //       lines: ["bakerloo", "central", "victoria"],
  //     },
  //     {
  //       name: "Liverpool Street",
  //       lines: ["central", "circle", "hammersmith-city", "metropolitan"],
  //     },
  //     {
  //       name: "Victoria",
  //       lines: ["circle", "district", "victoria"],
  //     },
  //     {
  //       name: "Paddington",
  //       lines: ["bakerloo", "circle", "district", "hammersmith-city"],
  //     },
  //   ];

  useEffect(() => {
    fetch(`https://api.tfl.gov.uk/StopPoint/Mode/tube,dlr,elizabeth-line`)
      // fetch(`https://api.tfl.gov.uk/StopPoint/Mode/elizabeth-line`)
      .then((res) => {
        console.log(res.status, `AllTransport`);
        return res.json();
      })
      .then((data) => {
        setStopPointData(
          data.stopPoints.filter(
            (stopPoint: StopPoint) =>
              stopPoint.stopType === "NaptanMetroStation" ||
              stopPoint.stopType === "NaptanRailStation"
          )
        );
        // setStopPointData(data);
      });
  }, []);

  console.log(stopPointData);

  return (
    <>
      <div className="h-full flex flex-col gap-4 relative">
        <input
          className="border-2 border-gray-200 rounded-md p-2 outline-none w-full"
          placeholder="Search station..."
          type="search"
          onFocus={(e) => {
            e.target.select();
          }}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <div className="flex-auto basis-full flex flex-row flex-wrap gap-4 overflow-y-auto scrollbar-hide justify-center">
          {/* {stations.map(
            (station, index) =>
              filterStations(searchQuery, station.name) && (
                <StationWidget
                  key={index}
                  name={station.name}
                  lines={station.lines}
                  setStationClicked={() => setStationClicked(true)}
                />
              )
          )} */}
          {stopPointData.map(
            (stopPoint, index) =>
              filterStations(
                searchQuery,
                formatStationName(stopPoint.commonName)
              ) && (
                <StationWidget
                  key={index}
                  name={formatStationName(stopPoint.commonName)}
                  lines={removeBus(stopPoint.lines.map((line) => line.id))}
                  id={stopPoint.naptanId}
                  setStationClicked={(id) => {
                    setStationId(id);
                    setStationClicked(true);
                  }}
                />
              )
          )}
        </div>
      </div>
      <div
        className={`w-full h-full bg-gray-950/50 flex flex-col absolute top-0 left-0 z-10 justify-center items-center ${
          stationClicked
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
        onClick={() => setStationClicked(false)}
      >
        <ArrivalBoard stationId={stationId} />
      </div>
    </>
  );
};

export default ArrivalsPage;
