import { useState } from "react";
import MaterialSymbolsCheckCircle from "../icons/MaterialSymbolsCheckCircle";

interface TagsProps {
  children?: React.ReactNode;
  onToggle: () => void;
}

const Tags = ({ children, onToggle }: TagsProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleClick = () => {
    setToggle(!toggle);
    onToggle();
  };
  return (
    <div
      className={`flex border rounded-lg h-8 px-2 items-center ${
        toggle ? "border-green-400 gap-2" : "border-gray-400"
      } transition-all hover:scale-105 cursor-pointer`}
      onClick={() => handleClick()}
    >
      <div
        className={`overflow-hidden transition-all ${
          toggle ? "custom-animate" : "custom-animate-2"
        }`}
      >
        <MaterialSymbolsCheckCircle
          className={`text-green-400 ${
            toggle ? "scale-100 custom-animate-3" : "scale-0 custom-animate-4"
          } transition-all`}
        />
      </div>
      <p className="leading-none h-5 flex items-center">{children}</p>
    </div>
  );
};

export default Tags;
