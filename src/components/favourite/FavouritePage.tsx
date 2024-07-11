import { useState } from "react";
import { StopPoint } from "../arrivals/ArrivalsPage";
import StationWidget from "../arrivals/StationWidget";
import formatStationName from "../utils/formatStationName";
import removeBus from "../utils/removeBus";
import ArrivalBoard from "../arrivals/ArrivalBoard";
import MaterialSymbolsCancel from "../../icons/MaterialSymbolsCancel";

interface FavouritePageProps {
  favouriteData: StopPoint[];
}

const FavouritePage = ({ favouriteData }: FavouritePageProps) => {
  const [stationId, setStationId] = useState<string>("940GZZDLCGT");
  const [stationClicked, setStationClicked] = useState<boolean>(false);

  return (
    <>
      <div className="h-full flex flex-col gap-4 relative">
        {favouriteData.map((stopPoint, index) => (
          <StationWidget
            key={index}
            name={formatStationName(stopPoint.commonName)}
            lines={removeBus(stopPoint.lines.map((line) => line.id))}
            id={stopPoint.naptanId}
            setStationClicked={(id) => {
              setStationId(id);
              setStationClicked(true);
            }}
            status={[]}
            setDisruptionReason={() => console.log("hello")}
            isFavourite={stopPoint.favourite}
            addToFavourites={() => console.log()}
          />
        ))}
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
    </>
  );
};

export default FavouritePage;
