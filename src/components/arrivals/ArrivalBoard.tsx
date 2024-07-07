import { useEffect, useState } from "react";
import MaterialSymbolsProgressActivity from "../../icons/MaterialSymbolsProgressActivity";
import formatStationName from "../utils/formatStationName";

interface trains {
  platformName: string;
  destinationName: string;
  expectedArrival: string;
}

interface trainsCleaned {
  platformName: string;
  destinationName: string;
  expectedArrival: number;
}

const ArrivalBoard = ({ stationId }: { stationId: string }) => {
  const [currentStation, setCurrentStation] = useState<string>("");
  const [arrivalData, setArrivalData] = useState<trains[]>([]);
  const [isPending, setIsPending] = useState(true);
  useEffect(() => {
    const fetchData = () => {
      fetch(`https://api.tfl.gov.uk/StopPoint/${stationId}/Arrivals`)
        .then((res) => {
          console.log(res.status, "StationArrivals");
          return res.json();
        })
        .then((data) => {
          setArrivalData(data);
          setCurrentStation(data[0].stationName);
          setIsPending(false);
        });
    };

    // Fetch data initially
    fetchData();

    // Fetch data every second
    const interval = setInterval(fetchData, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [stationId]);

  //   countdown convertor function
  function countDown(expectedArrival: string) {
    const arrivalTime = new Date(expectedArrival);
    const now = new Date();
    let countDown = Math.floor(
      (arrivalTime.getTime() - now.getTime()) / 1000 / 60
    );

    if (countDown < 0) {
      return 0;
    }

    return countDown;
  }

  if (!arrivalData) {
    return <div>Loading...</div>;
  }

  const trainData: trainsCleaned[] = [];
  for (let train of arrivalData) {
    trainData.push({
      platformName: train.platformName,
      destinationName: train.destinationName,
      expectedArrival: countDown(train.expectedArrival),
    });
  }

  //   what kind of sorting algorithm is this??????
  trainData.sort((a, b) => {
    if (a.platformName === b.platformName) {
      return a.expectedArrival - b.expectedArrival;
    } else {
      return a.platformName.localeCompare(b.platformName);
    }
  });

  // split into platforms
  const separatedTrainData: { [key: string]: trainsCleaned[] } = {};

  trainData.forEach((arrival) => {
    const platform = arrival.platformName;
    if (!separatedTrainData[platform]) {
      separatedTrainData[platform] = [];
    }
    separatedTrainData[platform].push(arrival);
  });

  //   setIsPending(false);

  function currentTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-GB");
  }

  return (
    <>
      {isPending && (
        <MaterialSymbolsProgressActivity className="w-12 h-12 text-white animate-spin" />
      )}
      {!isPending && (
        <div className="w-full max-w-[1040px] h-[540px] bg-gray-950 flex justify-center items-center rounded-2xl">
          <div className="w-full max-w-[1000px] h-[500px] bg-green-950 text-yellow-400 text-2xl md:text-4xl font-dot-gothic flex flex-col items-center gap-y-4 p-4">
            <p>{currentStation}</p>
            <p>{currentTime()}</p>
            <div className="flex flex-col w-full overflow-y-auto scrollbar-hide gap-y-4">
              {Object.keys(separatedTrainData).map((platform, index) => (
                <div key={index} className="w-full">
                  <div>{platform}</div>
                  <div className="w-full h-[1px] bg-yellow-400" />
                  <div className="w-full">
                    {separatedTrainData[platform].map(
                      (train: trainsCleaned, index) => (
                        <div
                          className="w-full flex justify-between"
                          key={index}
                        >
                          <p>{formatStationName(train.destinationName)}</p>
                          <p>
                            {train.expectedArrival != 0
                              ? train.expectedArrival.toString() + " mins"
                              : "due"}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArrivalBoard;
