import { useEffect, useState } from "react";

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
interface Props {
  stationId: string;
}

const StationArrivals = ({ stationId }: Props) => {
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

  function currentTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-GB");
  }

  return (
    <>
      {isPending && <div>Loading...</div>}
      <div className="arrival-times-box">
        <div className="arrival-times-container">
          <div className="arrival-times-current-station">{currentStation}</div>
          <div className="arrival-times-current-time">{currentTime()}</div>
          {Object.keys(separatedTrainData).map((platform, index) => (
            <>
              <div key={index}>{platform.toUpperCase()}</div>
              <ul>
                {separatedTrainData[platform].map(
                  (train: trainsCleaned, index) => (
                    <div
                      className="arrival-destination-time-container"
                      key={index}
                    >
                      <div>{train.destinationName.toUpperCase()}</div>
                      <div>
                        {train.expectedArrival != 0
                          ? train.expectedArrival.toString() + "MIN"
                          : "DUE"}
                      </div>
                    </div>
                  )
                )}
              </ul>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default StationArrivals;
