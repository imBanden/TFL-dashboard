import { useState } from "react";
import { MaterialSymbolsInfoOutline } from "../icons/MaterialSymbolsInfoOutline";
import MaterialSymbolsTramOutline from "../icons/MaterialSymbolsTramOutline";
import MaterialSymbolsMenu from "../icons/MaterialSymbolsMenu";
import MaterialSymbolsStickyNote2Outline from "../icons/MaterialSymbolsStickyNote2Outline";
import MaterialSymbolsFavorite from "../icons/MaterialSymbolsFavorite";

interface SidebarNavProps {
  handleSelectedPage: (selected: number) => void;
}

const SidebarNav = ({ handleSelectedPage }: SidebarNavProps) => {
  const [selected, setSelected] = useState<number>(
    JSON.parse(localStorage.getItem("favouriteStopPoints") || "[]").length === 0
      ? 0
      : 1
  );

  const navMenu = [
    {
      icon: MaterialSymbolsTramOutline,
      text: "Train arrivals",
      selected: 0,
    },
    {
      icon: MaterialSymbolsFavorite,
      text: "Favourites",
      selected: 1,
    },
    {
      icon: MaterialSymbolsInfoOutline,
      text: "About this app",
      selected: 2,
    },
    {
      icon: MaterialSymbolsStickyNote2Outline,
      text: "Patch notes",
      selected: 3,
    },
  ];
  return (
    <div className="flex flex-col border-r w-full h-full border-r-gray-4000 p-4 gap-4">
      <div className="flex items-center gap-4">
        <MaterialSymbolsMenu className="w-6 h-6 cursor-pointer" />
        <p className="text-black text-lg">isMyTFLhere.com</p>
      </div>

      <div className="flex flex-col gap-2">
        {navMenu.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 cursor-pointer ${
              selected === item.selected ? "bg-gray-100" : "hover:bg-gray-100"
            } rounded-md p-2`}
            onClick={() => {
              setSelected(item.selected);
              handleSelectedPage(item.selected);
            }}
          >
            <item.icon />
            <p
              className={`text-black text-sm ${
                selected === item.selected && "font-semibold"
              }`}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarNav;
