import { useEffect, useState } from "react";

interface Mode {
  id: string;
}

interface Station {
  name: string;
}

interface Route {
  stations: Station[];
}

interface Props {
  tubeArray: { [key: string]: string[] };
}

const GetAllTube = ({ tubeArray }: Props) => {
  const [arrOut, setArrOut] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    const fetchData = async (url: string) => {
      const response = await fetch(url);
      return await response.json();
    };

    const processTransportData = async () => {
      const modes: Mode[] = await fetchData(
        "https://api.tfl.gov.uk/line/mode/tube"
      );
      const tempArrOut: { [key: string]: string[] } = {};

      for (const mode of modes) {
        const thismode: Route = await fetchData(
          `https://api.tfl.gov.uk/Line/${mode.id}/Route/sequence/inbound`
        );

        for (const station of thismode.stations) {
          if (!tempArrOut[station.name]) {
            tempArrOut[station.name] = [];
          }
          tempArrOut[station.name].push(mode.id);
        }
      }

      // Sorting stations alphabetically
      const sortedStations = Object.keys(tempArrOut).sort();

      const finalArrOut: { [key: string]: string[] } = {};
      sortedStations.forEach((name) => {
        finalArrOut[name] = tempArrOut[name];
      });

      setArrOut(finalArrOut);
    };

    processTransportData();
  }, []);

  tubeArray = arrOut;

  return (
    <div>
      {Object.entries(arrOut).map(([name, modes]) => (
        <div key={name}>
          <span>{name}: </span>
          <span>{modes.join("")}</span>
        </div>
      ))}
    </div>
  );
};

export default GetAllTube;
