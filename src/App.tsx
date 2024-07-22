import { useEffect, useState } from "react";
import "./App.css";
import SidebarNav from "./components/SidebarNav";
import AboutPage from "./components/about/AboutPage";
import ArrivalsPage, {
  StopPoint,
  StationStatus,
} from "./components/arrivals/ArrivalsPage";
import MaterialSymbolsMenu from "./icons/MaterialSymbolsMenu";
import NotesPage from "./components/notes/NotesPage";
import FavouritePage from "./components/favourite/FavouritePage";

const App = () => {
  if (localStorage.getItem("favouriteStopPoints") === null) {
    localStorage.setItem("favouriteStopPoints", JSON.stringify([]));
  }
  const [sideBarClicked, setSideBarClicked] = useState<boolean>(false);
  const [favouriteData, setFavouriteData] = useState<StopPoint[]>(
    JSON.parse(localStorage.getItem("favouriteStopPoints") || "[]")
  );
  const [currPageIndex, setCurrPageIndex] = useState<number>(
    favouriteData.length != 0 ? 1 : 0
  );
  const [stopPointData, setStopPointData] = useState<StopPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statusArray, setStatusArray] = useState<StationStatus[]>([]);

  useEffect(() => {
    fetch(
      `https://api.tfl.gov.uk/StopPoint/Mode/dlr,elizabeth-line,tube,overground`
    )
      .then((res) => {
        console.log(res.status, `fetched stop points`);
        return res.json();
      })
      .then((data) => {
        setStopPointData(
          data.stopPoints
            .filter(
              (stopPoint: StopPoint) =>
                stopPoint.stopType === "NaptanMetroStation" ||
                stopPoint.stopType === "NaptanRailStation"
              // stopPoint.stopType === "TransportInterchange"
            )
            .map((item: StopPoint) => ({
              ...item,
              favourite: false,
            }))
        );
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://api.tfl.gov.uk/Line/Mode/dlr,elizabeth-line,tube,overground/Status`
    )
      .then((res) => {
        console.log(res.status, `fetched stop points`);
        return res.json();
      })
      .then((data) => {
        setStatusArray(
          data.map((line: StationStatus) => ({
            id: line.id,
            lineStatuses: line.lineStatuses,
          }))
        );
      });
  }, []);

  const onHandleFavouriteData = (data: StopPoint[]) => {
    setFavouriteData(data);
    localStorage.setItem("favouriteStopPoints", JSON.stringify(data));
  };

  // console.log(stopPointData);

  return (
    <div className="flex w-full h-full overflow-hidden">
      <div className="md:min-w-[300px] h-full hidden md:flex">
        <SidebarNav handleSelectedPage={(index) => setCurrPageIndex(index)} />
      </div>
      <div className="flex flex-col flex-auto basis-full p-4 gap-4">
        <div className="flex gap-4 items-center md:hidden">
          <button onClick={() => setSideBarClicked(true)}>
            <MaterialSymbolsMenu className="w-6 h-6 cursor-pointer" />
          </button>
          <p className="text-black text-lg">isMyTFLhere.com</p>
        </div>
        {currPageIndex === 0 && (
          <ArrivalsPage
            stopPointData={stopPointData}
            isLoading={isLoading}
            status={statusArray}
            favouriteData={favouriteData}
            handlefavouriteData={(data) => onHandleFavouriteData(data)}
          />
        )}
        {currPageIndex === 1 && (
          <FavouritePage
            status={statusArray}
            favouriteData={favouriteData}
            handlefavouriteData={(data) => onHandleFavouriteData(data)}
          />
        )}
        {currPageIndex === 2 && <AboutPage />}
        {currPageIndex === 3 && <NotesPage />}
      </div>

      {/* Menu slider */}
      <div
        className={`w-full h-full bg-gray-950/50 flex flex-col absolute top-0 left-0 z-10 ${
          sideBarClicked
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
        onClick={() => setSideBarClicked(false)}
      >
        <div
          className={`w-[300px] h-full flex bg-white -translate-x-full opacity-100 transition-transform duration-300 ${
            sideBarClicked && "translate-x-0"
          } `}
        >
          <SidebarNav
            handleSelectedPage={(index) => {
              setCurrPageIndex(index);
              setSideBarClicked(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
