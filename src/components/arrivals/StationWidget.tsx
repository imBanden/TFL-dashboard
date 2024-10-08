import formatLineName from "../utils/formatLineName";
import { bgLineColors } from "../utils/lineColors";
import { StationStatus } from "../arrivals/ArrivalsPage";
import WarningBadge from "../WarningBadge";
import MaterialSymbolsFavorite from "../../icons/MaterialSymbolsFavorite";
import { useState } from "react";
import filterModes from "../utils/filterModes";

interface StationWidgetProps {
  name: string;
  lines: string[];
  id: string;
  status: StationStatus[];
  isFavourite: boolean;
  setStationClicked: (id: string) => void;
  setDisruptionReason: (
    reason: string,
    showMessage: boolean,
    lineId: string
  ) => void;
  addToFavourites: (value: boolean) => void;
}

const StationWidget = ({
  name,
  lines,
  id,
  status,
  isFavourite,
  setStationClicked,
  setDisruptionReason,
  addToFavourites,
}: StationWidgetProps) => {
  const [favourite, setFavourite] = useState<boolean>(isFavourite);
  const handleClick = () => {
    setStationClicked(id);
  };
  const handleFavouriteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setFavourite((prev) => !prev);
    addToFavourites(!favourite);
  };

  return (
    <div
      className="flex flex-col justify-between w-[calc(100vw/3)] h-[calc(100vw/2.5)] max-w-[calc(100%/2.1)] md:w-[calc(100vw/5)] md:h-[calc(100vw/5)] md:max-w-[calc(100vw/5)] flex-auto border border-gray-200 rounded-md shadow-md p-3 cursor-pointer hover:scale-105 transition-all duration-300"
      onClick={() => handleClick()}
    >
      <div className="flex items-start justify-between">
        <p className="md:text-2xl text-lg whitespace-normal">{name}</p>
        <div
          className={`${
            favourite ? "text-red-400" : "text-gray-100"
          } flex justify-center items-center cursor-pointer transition-text duration-300`}
          onClick={(e) => {
            handleFavouriteClick(e);
            console.log(name, "clicked");
          }}
        >
          <MaterialSymbolsFavorite className="w-6 h-6" />
        </div>
      </div>
      <div className="w-full flex overflow-x-auto gap-2 scrollbar-hide">
        {status.map(
          (item, index) =>
            lines.includes(item.id) && (
              <div key={index} className="flex gap-2">
                {item.lineStatuses.map(
                  (lineStatus, index) =>
                    lineStatus.statusSeverityDescription != "Good Service" && (
                      <WarningBadge
                        key={index}
                        lineId={item.id}
                        lineStatusDescription={
                          lineStatus.statusSeverityDescription
                        }
                        reason={lineStatus.reason}
                        handleHover={(disruptionReason, showMessage, lineId) =>
                          setDisruptionReason(
                            disruptionReason,
                            showMessage,
                            lineId
                          )
                        }
                      />
                    )
                )}
              </div>
            )
        )}
      </div>
      {/* <div className="flex flex-row flex-wrap gap-2">
        {filterModes(lines).map((line, index) => (
          <div key={index} className="flex flex-col">
            <p className="text-sm text-gray-500 px-0.5 select-none">
              {formatLineName(line)}
            </p>
            <div className={`h-1 ${bgLineColors[line]} rounded-full`} />
          </div>
        ))}
      </div> */}

      <div className="flex flex-row flex-wrap gap-2">
        {filterModes(lines).map((line, index) => (
          <div key={index} className="flex flex-col">
            <div
              className={`${bgLineColors[line]} h-6 w-10 select-none flex justify-center items-center text-white text-md leading-none`}
            >
              {formatLineName(line).substring(0, 3).toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StationWidget;
