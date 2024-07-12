import { useState } from "react";
import { StopPoint, StationStatus } from "../arrivals/ArrivalsPage";
import StationWidget from "../arrivals/StationWidget";
import formatStationName from "../utils/formatStationName";
import removeBus from "../utils/removeBus";
import ArrivalBoard from "../arrivals/ArrivalBoard";
import MaterialSymbolsCancel from "../../icons/MaterialSymbolsCancel";
import MaterialSymbolsHeartBroken from "../../icons/MaterialSymbolsHeartBroken";
import highlightStationName from "../utils/highlightStationName";
import { bgLineColors } from "../utils/lineColors";

interface FavouritePageProps {
  status: StationStatus[];
  favouriteData: StopPoint[];
  handlefavouriteData: (array: StopPoint[]) => void;
}

const FavouritePage = ({
  favouriteData,
  status,
  handlefavouriteData,
}: FavouritePageProps) => {
  const [stationId, setStationId] = useState<string>("940GZZDLCGT");
  const [stationClicked, setStationClicked] = useState<boolean>(false);
  const [disruption, setDisruption] = useState<{
    reason: string;
    showMessage: boolean;
    lineId: string;
  }>({ reason: "", showMessage: false, lineId: "" });

  console.log(favouriteData);

  return (
    <>
      <div className="h-full flex flex-col gap-4 relative">
        <div className="flex flex-row flex-wrap flex-grow gap-4 overflow-y-auto scrollbar-hide p-2">
          {favouriteData.length === 0 ? (
            <div className="flex w-full justify-center items-center">
              <div className="flex flex-col items-center gap-8">
                <MaterialSymbolsHeartBroken className="h-12 w-12 text-gray-400" />
                <p className="text-xl text-center text-gray-400">
                  You have no favourite station.
                </p>
              </div>
            </div>
          ) : (
            favouriteData.map((stopPoint, index) => (
              <StationWidget
                key={index}
                name={formatStationName(stopPoint.commonName)}
                lines={removeBus(stopPoint.lines.map((line) => line.id))}
                id={stopPoint.naptanId}
                setStationClicked={(id) => {
                  setStationId(id);
                  setStationClicked(true);
                }}
                status={status}
                setDisruptionReason={(reason, showMessage, lineId) => {
                  setDisruption({ reason, showMessage, lineId });
                }}
                isFavourite={stopPoint.favourite}
                addToFavourites={(isFavourite) => {
                  if (!isFavourite) {
                    handlefavouriteData(
                      favouriteData.filter(
                        (stop) => stop.naptanId !== stopPoint.naptanId
                      )
                    );
                    stopPoint.favourite = false;
                  }
                }}
              />
            ))
          )}
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
      </div>
    </>
  );
};

export default FavouritePage;
