import formatLineName from "../utils/formatLineName";
import { stationStatus } from "../arrivals/ArrivalsPage";
import WarningBadge from "../WarningBadge";

interface StationWidgetProps {
  name: string;
  lines: string[];
  id: string;
  status: stationStatus[];
  setStationClicked: (id: string) => void;
  setDisruptionReason: (reason: string, showMessage: boolean) => void;
}

const StationWidget = ({
  name,
  lines,
  id,
  status,
  setStationClicked,
  setDisruptionReason,
}: StationWidgetProps) => {
  const handleClick = () => {
    setStationClicked(id);
  };

  console.log(status);

  return (
    <div
      className="flex flex-col justify-between max-w-[calc((100vw/2)*0.80)] w-[calc((100vw/2)*0.80)] md:w-[calc((100vw/4)*0.60)] h-[calc((100vw/2)*0.8)] md:h-[calc((100vw/5)*0.9)] flex-auto border border-gray-200 rounded-md shadow-md p-3 cursor-pointer hover:scale-105 transition-all duration-300"
      onClick={() => handleClick()}
    >
      {/* <div className="bg-bakerloo w-1 h-1" />
      <div className="bg-central w-1 h-1" />
      <div className="bg-circle w-1 h-1" />
      <div className="bg-district w-1 h-1" />
      <div className="bg-elizabeth w-1 h-1" />
      <div className="bg-hammersmith-city w-1 h-1" />
      <div className="bg-jubilee w-1 h-1" />
      <div className="bg-metropolitan w-1 h-1" />
      <div className="bg-northern w-1 h-1" />
      <div className="bg-piccadilly w-1 h-1" />
      <div className="bg-victoria w-1 h-1" />
      <div className="bg-waterloo-city w-1 h-1" />
      <div className="bg-dlr w-1 h-1" /> */}

      {/* <div className="border-l-bakerloo w-1 h-1" />
      <div className="border-l-central w-1 h-1" />
      <div className="border-l-circle w-1 h-1" />
      <div className="border-l-district w-1 h-1" />
      <div className="border-l-elizabeth w-1 h-1" />
      <div className="border-l-hammersmith-city w-1 h-1" />
      <div className="border-l-jubilee w-1 h-1" />
      <div className="border-l-metropolitan w-1 h-1" />
      <div className="border-l-northern w-1 h-1" />
      <div className="border-l-piccadilly w-1 h-1" />
      <div className="border-l-victoria w-1 h-1" />
      <div className="border-l-waterloo-city w-1 h-1" />
      <div className="border-l-dlr w-1 h-1" /> */}
      <p
        className="md:text-3
      2xl text-xl"
      >
        {name}
      </p>
      <div className="w-full flex overflow-x-auto gap-2 scrollbar-hide">
        {status.map(
          (item) =>
            lines.includes(item.id) && (
              <>
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
                        handleHover={(disruptionReason, showMessage) =>
                          setDisruptionReason(disruptionReason, showMessage)
                        }
                      />
                    )
                )}
              </>
            )
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {lines.map((line, index) => (
          <div key={index} className="flex flex-col">
            <p className="text-sm text-gray-500 px-0.5">
              {formatLineName(line)}
            </p>
            <div className={`h-1 bg-${line} rounded-full`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StationWidget;
