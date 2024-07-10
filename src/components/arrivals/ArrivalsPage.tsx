import { useEffect, useState } from "react";
import ArrivalBoard from "./ArrivalBoard";
import StationWidget from "./StationWidget";
import filterStations from "../utils/filterStations";
import formatStationName from "../utils/formatStationName";
import removeBus from "../utils/removeBus";
import MaterialSymbolsCancel from "../../icons/MaterialSymbolsCancel";
import MaterialSymbolsProgressActivity from "../../icons/MaterialSymbolsProgressActivity";
import highlightStationName from "../utils/highlightStationName";
import { bgLineColors } from "../utils/lineColors";

export interface StopPoint {
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

const ArrivalsPage = ({
  favouriteData,
}: {
  favouriteData: (array: StopPoint[]) => void;
}) => {
  const [stationClicked, setStationClicked] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [stopPointData, setStopPointData] = useState<StopPoint[]>([]);
  const [stationId, setStationId] = useState<string>("940GZZDLCGT");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusArray, setStatusArray] = useState<stationStatus[]>([]);
  const [disruption, setDisruption] = useState<{
    reason: string;
    showMessage: boolean;
    lineId: string;
  }>({ reason: "", showMessage: false, lineId: "" });
  const [favouriteStopPoints, setFavouriteStopPoints] = useState<StopPoint[]>(
    []
  );

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
                    setDisruptionReason={(reason, showMessage, lineId) => {
                      setDisruption({ reason, showMessage, lineId });
                    }}
                    addToFavourites={(isFavourite) => {
                      console.log(isFavourite);
                      if (isFavourite) {
                        favouriteData([stopPoint, ...favouriteStopPoints]);
                        setFavouriteStopPoints((prev) => [stopPoint, ...prev]);
                      }
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
            <MaterialSymbolsCancel className="w-16 h-16 text-gray-200 shadow-lg hover:scale-105 transition-all duration-300 rounded-full" />
          </button>
        </div>
      </div>

      <div
        className={`w-full h-full bg-gray-950/50 flex flex-col absolute top-0 left-0 z-10 justify-center items-center p-8 ${
          disruption.showMessage
            ? "opacity-100 pointer-events-none"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
      >
        <div className="bg-white p-8 border border-gray-500 rounded-2xl flex flex-col gap-2">
          <p className={`flex text-2xl pl-4`}>
            {highlightStationName(disruption.reason, true)}
          </p>
          <div
            className={`h-1 ${bgLineColors[disruption.lineId]} rounded-full`}
          />

          <p className={`flex text-md text-gray-600 pl-4`}>
            {highlightStationName(disruption.reason, false)}
          </p>
        </div>
      </div>
    </>
  );
};

export default ArrivalsPage;
