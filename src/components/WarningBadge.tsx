import lineColors from "../components/utils/lineColors";
import TwemojiWarning from "../icons/TwemojiWarning";

interface WarningBadgeProps {
  lineId: string;
  lineStatusDescription: string;
  reason: string;
  handleHover: (reason: string, showMessage: boolean, lineId: string) => void;
}

const WarningBadge = ({
  lineId,
  lineStatusDescription,
  reason,
  handleHover,
}: WarningBadgeProps) => {
  return (
    <div
      className={`flex gap-2 items-center bg-yellow-100 px-2 py-1 border-l-4 ${lineColors(
        lineId,
        "border-l"
      )} pr-4`}
      onMouseEnter={() => handleHover(reason, true, lineId)}
      onMouseLeave={() => handleHover(reason, false, lineId)}
      onTouchStart={() => handleHover(reason, true, lineId)}
      onTouchEnd={() => handleHover(reason, false, lineId)}
    >
      <TwemojiWarning className="h-4" />
      <p className="text-xs text-gray-black whitespace-nowrap select-none translate-y-[1px]">
        {lineStatusDescription}
      </p>
    </div>
  );
};

export default WarningBadge;
