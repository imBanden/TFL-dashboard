import { useEffect, useState } from "react";
import ArrivalBoard from "./ArrivalBoard";
import StationWidget from "./StationWidget";
import filterStations from "../utils/filterStations";
import formatStationName from "../utils/formatStationName";
import removeBus from "../utils/removeBus";
import MaterialSymbolsCancel from "../../icons/MaterialSymbolsCancel";
import MaterialSymbolsProgressActivity from "../../icons/MaterialSymbolsProgressActivity";

interface StopPoint {
  stopType: string;
  commonName: string;
  lines: { id: string }[];
  lineModeGroups: { modeName: string }[];
  naptanId: string;
}

export interface stationStatus {
  id: string;
  lineStatuses: any[];
}

const ArrivalsPage = () => {
  const [stationClicked, setStationClicked] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [stopPointData, setStopPointData] = useState<StopPoint[]>([]);
  const [stationId, setStationId] = useState<string>("940GZZDLCGT");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusArray, setStatusArray] = useState<stationStatus[]>([]);
  const [disruptionReason, setDisruptionReason] = useState<string>("");
  const [showDisruptionMessage, setShowDisruptionMessage] =
    useState<boolean>(false);

  useEffect(() => {
    fetch(`https://api.tfl.gov.uk/StopPoint/Mode/tube,dlr`)
      // fetch(`https://api.tfl.gov.uk/StopPoint/Mode/elizabeth-line`)
      .then((res) => {
        console.log(res.status, `fetched stop points`);
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
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.tfl.gov.uk/Line/Mode/tube,dlr/Status`)
      // fetch(`https://api.tfl.gov.uk/StopPoint/Mode/elizabeth-line`)
      .then((res) => {
        console.log(res.status, `fetched stop points`);
        return res.json();
      })
      .then((data) => {
        setStatusArray(data);
      });
  }, []);

  const status: stationStatus[] = statusArray.map((line) => ({
    id: line.id,
    lineStatuses: line.lineStatuses,
  }));

  // const status = [
  //   {
  //     id: "circle",
  //     lineStatuses: [
  //       { statusSeverityDescription: "You gay", reason: "You is too hot" },
  //       { statusSeverityDescription: "Kuka gay", reason: "Kuka is too hot" },
  //       {
  //         statusSeverityDescription: "brandon gay",
  //         reason: "brandon is too hot",
  //       },
  //     ],
  //   },

  //   {
  //     id: "district",
  //     lineStatuses: [
  //       { statusSeverityDescription: "he gay", reason: "he is too hot" },
  //     ],
  //   },
  // ];

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
        <div
          className={`flex flex-row flex-wrap flex-grow gap-4 overflow-y-auto scrollbar-hide p-2 ${
            isLoading && "justify-center items-center"
          }`}
        >
          {isLoading ? (
            <MaterialSymbolsProgressActivity className="w-12 h-12 text-gray-400 animate-spin" />
          ) : (
            stopPointData.map(
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
                    status={status}
                    setStationClicked={(id) => {
                      setStationId(id);
                      setStationClicked(true);
                    }}
                    setDisruptionReason={(reason, showMessage) => {
                      setDisruptionReason(reason);
                      setShowDisruptionMessage(showMessage);
                    }}
                  />
                )
            )
          )}
        </div>
      </div>
      <div
        className={`w-full h-full bg-gray-950/50 flex flex-col absolute top-0 left-0 z-10 md:justify-center items-center ${
          stationClicked
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
      >
        <ArrivalBoard stationId={stationId} />
        <div className="flex-grow flex justify-center items-center">
          <button onClick={() => setStationClicked(false)}>
            <MaterialSymbolsCancel className="w-16 h-16 text-gray-200 shadow-lg hover:scale-105 transition-all duration-300" />
          </button>
        </div>
      </div>

      <div
        className={`w-full h-full bg-gray-950/50 flex flex-col absolute top-0 left-0 z-10 justify-center items-center p-8 ${
          showDisruptionMessage
            ? "opacity-100 pointer-events-none"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
      >
        <div className="bg-white p-8 border border-gray-500 rounded-2xl">
          <p className={`text-lg border-l-8 border-l-gray-400 pl-4`}>
            {disruptionReason}
          </p>
        </div>
      </div>
    </>
  );
};

export default ArrivalsPage;
