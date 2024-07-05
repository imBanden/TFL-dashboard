import circleLineLogo from "../assets/Circle_Line_roundel.svg";
import bakerlooLineLogo from "../assets/Bakerloo_line_roundel.svg";
import centralLineLogo from "../assets/Central_Line_roundel.svg";
import districtLineLogo from "../assets/District_line_roundel.svg";
import hammersmithCityLineLogo from "../assets/H&c_line_roundel.svg";
import jubileeLineLogo from "../assets/Jubilee_line_roundel.svg";
import metropolitanLineLogo from "../assets/Metropolitan_line_roundel.svg";
import northernLineLogo from "../assets/Northern_line_roundel.svg";
import picadillyLineLogo from "../assets/Piccadilly_line_roundel.svg";
import victoriaLineLogo from "../assets/Victoria_line_roundel.svg";
import waterlooCityLineLogo from "../assets/W&c_line_roundel.svg";

interface Props {
  tubeArray: string[];
}

// const logoImages: any = {
//   circle: circleLineLogo,
//   bakerloo: bakerlooLineLogo,
// };

const TubeLinesLogo = ({ tubeArray }: Props) => {
  return (
    <>
      <div className="stop-points-modes-logo-container">
        {/* {tubeArray.map((tube, i) => (
          <img src={logoImages[tube]} key={i} />
        ))} */}
        {tubeArray.includes("circle") && (
          <img className="stop-points-modes-logo" src={circleLineLogo}></img>
        )}
        {tubeArray.includes("bakerloo") && (
          <img className="stop-points-modes-logo" src={bakerlooLineLogo}></img>
        )}
        {tubeArray.includes("central") && (
          <img className="stop-points-modes-logo" src={centralLineLogo}></img>
        )}
        {tubeArray.includes("district") && (
          <img className="stop-points-modes-logo" src={districtLineLogo}></img>
        )}
        {tubeArray.includes("hammersmith-city") && (
          <img
            className="stop-points-modes-logo"
            src={hammersmithCityLineLogo}
          ></img>
        )}
        {tubeArray.includes("jubilee") && (
          <img className="stop-points-modes-logo" src={jubileeLineLogo}></img>
        )}
        {tubeArray.includes("metropolitan") && (
          <img
            className="stop-points-modes-logo"
            src={metropolitanLineLogo}
          ></img>
        )}
        {tubeArray.includes("northern") && (
          <img className="stop-points-modes-logo" src={northernLineLogo}></img>
        )}
        {tubeArray.includes("piccadilly") && (
          <img className="stop-points-modes-logo" src={picadillyLineLogo}></img>
        )}
        {tubeArray.includes("victoria") && (
          <img className="stop-points-modes-logo" src={victoriaLineLogo}></img>
        )}
        {tubeArray.includes("waterloo-city") && (
          <img
            className="stop-points-modes-logo"
            src={waterlooCityLineLogo}
          ></img>
        )}
      </div>
    </>
  );
};

export default TubeLinesLogo;
