import { useEffect, useState } from "react";
import TubeLinesLogo from "./TubeLinesLogo";

interface TubeLinesData {
  lineId: string;
}

interface Props {
  tubeId: string;
}

const OneTransport = ({ tubeId }: Props) => {
  const [tubeLinesData, setTubeLinesData] = useState<TubeLinesData[]>([]);
  useEffect(() => {
    if (!tubeId) return;

    fetch(`https://api.tfl.gov.uk/StopPoint/${tubeId}/Route`)
      .then((res) => {
        console.log(res.status, `OneTransport`);
        return res.json();
      })
      .then((data) => {
        setTubeLinesData(data);
      });
  }, [tubeId]);

  if (!tubeLinesData) {
    return <div>Loading...</div>;
  }

  function removeDuplicates(arr: TubeLinesData[]) {
    let unique: string[] = [];
    arr.forEach((item: TubeLinesData) => {
      if (!unique.includes(item.lineId)) {
        unique.push(item.lineId);
      }
    });

    return unique;
  }

  return (
    <>
      <TubeLinesLogo tubeArray={removeDuplicates(tubeLinesData)} />
    </>
  );
};

export default OneTransport;
