import { useState } from "react";
import { MaterialSymbolsInfoOutline } from "../icons/MaterialSymbolsInfoOutline";
import MaterialSymbolsTramOutline from "../icons/MaterialSymbolsTramOutline";
import MaterialSymbolsMenu from "../icons/MaterialSymbolsMenu";

const SidebarNav = () => {
  const [selected, setSelected] = useState<number>(0);

  const navMenu = [
    {
      icon: MaterialSymbolsTramOutline,
      text: "Train arrivals",
      selected: 0,
    },
    {
      icon: MaterialSymbolsInfoOutline,
      text: "About this app",
      selected: 1,
    },
  ];
  return (
    <div className="flex flex-col border-r h-full border-r-gray-4000 p-4 gap-4">
      <div className="flex justify-between items-center">
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
            onClick={() => setSelected(item.selected)}
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
