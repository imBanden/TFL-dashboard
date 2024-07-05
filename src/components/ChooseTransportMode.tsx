import { useEffect, useState } from "react";

interface transportModeItem {
  modeName: string;
}

interface Props {
  onTransportModeNameClick: (transportModeName: string) => void;
}

const ChooseTransportMode = ({ onTransportModeNameClick }: Props) => {
  const [transportModesData, setTransportModesData] = useState([]);
  useEffect(() => {
    fetch(`https://api.tfl.gov.uk/StopPoint/Meta/Modes`)
      .then((res) => {
        console.log(res.status, "ChooseTransportMode");
        return res.json();
      })
      .then((data) => {
        setTransportModesData(data);
      });
  }, []);

  const handleClick = (transportModeName: string) =>
    onTransportModeNameClick(transportModeName);

  return (
    <>
      {transportModesData && (
        <ul>
          {transportModesData.map((transportMode: transportModeItem, index) => (
            <button
              onClick={() => handleClick(transportMode.modeName)}
              key={index}
            >
              {transportMode.modeName}
            </button>
          ))}
        </ul>
      )}
    </>
  );
};

export default ChooseTransportMode;
