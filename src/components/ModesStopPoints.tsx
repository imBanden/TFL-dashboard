import { useEffect, useState } from "react";

interface StopPoint {
  stopType: string;
  // Add other properties here if needed
}

interface stopPointItem {
  commonName: string;
  naptanId: string;
}

interface Props {
  onNaptanIdClick: (naptanId: string) => void;
  transportMode: string;
}

const ModesStopPoints = ({ onNaptanIdClick, transportMode }: Props) => {
  const [stopPointData, setStopPointData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [stopPointSearchData, setStopPointSearchData] = useState<
    stopPointItem[]
  >([]);

  useEffect(() => {
    fetch(`https://api.tfl.gov.uk/StopPoint/Mode/${transportMode}`)
      .then((res) => {
        console.log(res.status, "ModeStopPoints");
        return res.json();
      })
      .then((data) => {
        setStopPointData(
          data.stopPoints.filter(
            (stopPoint: StopPoint) =>
              stopPoint.stopType === "NaptanMetroStation"
          )
        );
        setIsPending(false);
      });
  }, [transportMode]);

  const handleClick = (naptanId: string) => {
    onNaptanIdClick(naptanId);
  };

  return (
    <>
      <div className="search-bar-container">
        <input
          type="search"
          placeholder="Search here"
          className="search-bar-input"
          onChange={(e) => {
            const searchQuery = e.target.value;
            let dataArray: stopPointItem[] = [];
            stopPointData.forEach((stopPoint: stopPointItem) => {
              const isVisible = stopPoint.commonName
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
              isVisible && dataArray.push(stopPoint);
            });
            setStopPointSearchData(dataArray);
          }}
        ></input>
      </div>
      <div>{transportMode}</div>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {(stopPointSearchData.length === 0
            ? stopPointData
            : stopPointSearchData
          ).map((stopPoint: stopPointItem, index) => (
            <button onClick={() => handleClick(stopPoint.naptanId)} key={index}>
              {stopPoint.commonName},{stopPoint.naptanId}
            </button>
          ))}
        </ul>
      )}
    </>
  );
};

export default ModesStopPoints;
