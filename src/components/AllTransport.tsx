import { useEffect, useState } from "react";
import dlrLogo from "../assets/DLR_roundel.svg";
import undergroundLogo from "../assets/Underground.svg";
import OneTransport from "./OneTransport";

interface StopPoint {
  stopType: string;
  // Add other properties here if needed
}

interface stopPointItem {
  commonName: string;
  naptanId: string;
  modes: string[];
}

const AllTransport = () => {
  const [stopPointData, setStopPointData] = useState<stopPointItem[]>([]);
  const [stopPointSearchData, setStopPointSearchData] = useState<
    stopPointItem[]
  >([]);

  useEffect(() => {
    fetch(`https://api.tfl.gov.uk/StopPoint/Mode/tube,dlr`)
      .then((res) => {
        console.log(res.status, `AllTransport`);
        return res.json();
      })
      .then((data) => {
        setStopPointData(
          data.stopPoints.filter(
            (stopPoint: StopPoint) =>
              stopPoint.stopType === "NaptanMetroStation"
          )
        );
        setStopPointSearchData(
          data.stopPoints.filter(
            (stopPoint: StopPoint) =>
              stopPoint.stopType === "NaptanMetroStation"
          )
        );
      });
  }, []);

  function removeStationString(stopPoint: string) {
    let newString: string = stopPoint.replace("DLR Station", "");
    newString = newString.replace("Underground Station", "");
    return newString;
  }

  return (
    <>
      <input
        onChange={(e) => {
          let stopPointQuerydata: stopPointItem[] = [];
          const searchValue = e.target.value;

          stopPointData.forEach((stopPoint: stopPointItem) => {
            const isVisible = stopPoint.commonName
              .toLowerCase()
              .includes(searchValue.toLowerCase());
            isVisible && stopPointQuerydata.push(stopPoint);
          });
          setStopPointSearchData(stopPointQuerydata);
        }}
        className="search-bar-input"
        placeholder="Search Station"
        type="search"
      ></input>
      {stopPointSearchData ? (
        stopPointSearchData.map((stopPoint: stopPointItem, index) => (
          <div className="stop-points-container" key={index}>
            {removeStationString(stopPoint.commonName)}
            <div className="stop-points-modes-log-container">
              <img
                className="stop-points-modes-logo"
                src={stopPoint.modes.includes("dlr") ? dlrLogo : ""}
              />
              <img
                className="stop-points-modes-logo"
                src={stopPoint.modes.includes("tube") ? undergroundLogo : ""}
              />
              {/* {stopPoint.modes.includes("tube") && (
                <OneTransport tubeId="stopPoint.naptanId" />
              )} */}
              <div>{stopPoint.naptanId}</div>
            </div>
          </div>
        ))
      ) : (
        <div>No Station Found :\</div>
      )}
    </>
  );
};

export default AllTransport;
