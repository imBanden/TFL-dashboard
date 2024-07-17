import { useState } from "react";
import ArrivalBoard from "./ArrivalBoard";
import StationWidget from "./StationWidget";
import filterStations from "../utils/filterStations";
import formatStationName from "../utils/formatStationName";
import removeBus from "../utils/removeBus";
import MaterialSymbolsCancel from "../../icons/MaterialSymbolsCancel";
import MaterialSymbolsProgressActivity from "../../icons/MaterialSymbolsProgressActivity";
import highlightStationName from "../utils/highlightStationName";
import { bgLineColors } from "../utils/lineColors";
import Tags from "../Tags";
import filterTags from "../utils/filterTags";
import sortAlphabetically from "../utils/sortAlphabetically";

export interface StopPoint {
  stopType: string;
  commonName: string;
  lines: { id: string }[];
  lineModeGroups: { modeName: string }[];
  naptanId: string;
  favourite: boolean;
}

export interface StationStatus {
  id: string;
  lineStatuses: any[];
}
interface TransportTags {
  underground: boolean;
  dlr: boolean;
  elizabeth: boolean;
}

interface ArrivlasPageProps {
  stopPointData: StopPoint[];
  isLoading: boolean;
  status: StationStatus[];
  favouriteData: StopPoint[];
  handlefavouriteData: (array: StopPoint[]) => void;
}

const ArrivalsPage = ({
  stopPointData,
  isLoading,
  status,
  favouriteData,
  handlefavouriteData,
}: ArrivlasPageProps) => {
  const [stationClicked, setStationClicked] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const [stopPointData, setStopPointData] = useState<StopPoint[]>([]);
  const [stationId, setStationId] = useState<string>("940GZZDLCGT");
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [statusArray, setStatusArray] = useState<StationStatus[]>([]);
  const [disruption, setDisruption] = useState<{
    reason: string;
    showMessage: boolean;
    lineId: string;
  }>({ reason: "", showMessage: false, lineId: "" });
  const [favouriteStopPoints, setFavouriteStopPoints] = useState<StopPoint[]>([
    ...favouriteData,
  ]);
  const [transportTags, setTransportTags] = useState<TransportTags>({
    underground: false,
    dlr: false,
    elizabeth: false,
  });
  const handleToggle = (tagName: keyof TransportTags) => {
    setTransportTags((prev) => ({ ...prev, [tagName]: !prev[tagName] }));
  };

  const tagsArray = Object.keys(transportTags).filter(
    (key) => transportTags[key as keyof TransportTags]
  );
  // console.log(tagsArray);

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
        <div className="flex flex-wrap gap-2">
          <Tags onToggle={() => handleToggle("underground")}>Underground</Tags>
          <Tags onToggle={() => handleToggle("dlr")}>DLR</Tags>
          <Tags onToggle={() => handleToggle("elizabeth")}>Elizabeth</Tags>
        </div>
        <div
          className={`flex flex-row flex-wrap gap-4 overflow-y-auto scrollbar-hide p-2 ${
            isLoading && "justify-center items-center"
          }`}
        >
          {isLoading ? (
            <MaterialSymbolsProgressActivity className="w-12 h-12 text-gray-400 animate-spin" />
          ) : (
            sortAlphabetically(stopPointData).map(
              (stopPoint, index) =>
                filterStations(
                  searchQuery,
                  formatStationName(stopPoint.commonName)
                ) &&
                filterTags(
                  tagsArray,
                  removeBus(stopPoint.lines.map((line) => line.id))
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
                    isFavourite={stopPoint.favourite}
                    addToFavourites={(isFavourite) => {
                      if (isFavourite) {
                        stopPoint.favourite = true;
                        handlefavouriteData([
                          stopPoint,
                          ...favouriteStopPoints,
                        ]);
                        setFavouriteStopPoints((prev) => [stopPoint, ...prev]);
                      } else {
                        stopPoint.favourite = false;
                        handlefavouriteData(
                          favouriteStopPoints.filter(
                            (stop) => stop.naptanId !== stopPoint.naptanId
                          )
                        );
                        setFavouriteStopPoints(
                          favouriteStopPoints.filter(
                            (stop) => stop.naptanId !== stopPoint.naptanId
                          )
                        );
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

      {/* <div
        className={`w-full h-full flex flex-col absolute top-20 left-0 z-10 md:justify-center items-center pointer-events-none ${
          toggleFavouriteMessage ? "animate-fadeInOut" : ""
        }`}
      >
        <div className="bg-black rounded-lg p-2 px-4">
          <p className="text-xl text-white">Added to favourites</p>
        </div>
      </div> */}
    </>
  );
};

export default ArrivalsPage;
