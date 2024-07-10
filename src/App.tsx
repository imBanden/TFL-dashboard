import { useState } from "react";
import "./App.css";
import SidebarNav from "./components/SidebarNav";
import AboutPage from "./components/about/AboutPage";
import ArrivalsPage, { StopPoint } from "./components/arrivals/ArrivalsPage";
import MaterialSymbolsMenu from "./icons/MaterialSymbolsMenu";
import NotesPage from "./components/notes/NotesPage";
import FavouritePage from "./components/favourite/FavouritePage";

const App = () => {
  const [currPageIndex, setCurrPageIndex] = useState<number>(0);
  const [sideBarClicked, setSideBarClicked] = useState<boolean>(false);
  const [favouriteData, setFavouriteData] = useState<StopPoint[]>([]);

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
          <ArrivalsPage favouriteData={(data) => setFavouriteData(data)} />
        )}
        {currPageIndex === 1 && <AboutPage />}
        {currPageIndex === 2 && <NotesPage />}
        {currPageIndex === 3 && <FavouritePage favouriteData={favouriteData} />}
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
