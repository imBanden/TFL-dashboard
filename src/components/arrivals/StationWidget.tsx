import formatLineName from "../utils/formatLineName";

interface StationWidgetProps {
  name: string;
  lines: string[];
  id: string;
  setStationClicked: (id: string) => void;
}

const StationWidget = ({
  name,
  lines,
  id,
  setStationClicked,
}: StationWidgetProps) => {
  const handleClick = () => {
    setStationClicked(id);
  };

  return (
    <div
      className="flex flex-col justify-between w-60 h-60 border border-gray-200 rounded-md shadow-md p-3 cursor-pointer hover:scale-105 transition-all duration-300"
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
      <p className="text-3xl">{name}</p>
      {/* <p className="text-sm text-gray-500">{id}</p> */}
      <div className="flex flex-row flex-wrap gap-2">
        {lines.map((line, index) => (
          <div key={index} className="flex flex-col">
            <p className="text-sm text-gray-500">{formatLineName(line)}</p>
            <div className={`h-1 bg-${line} rounded-full`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StationWidget;
