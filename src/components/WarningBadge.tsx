interface WarningBadgeProps {
  lineId: string;
  lineStatusDescription: string;
  reason: string;
  handleHover: (reason: string, showMessage: boolean) => void;
}

const WarningBadge = ({
  lineId,
  lineStatusDescription,
  reason,
  handleHover,
}: WarningBadgeProps) => {
  return (
    <div
      className={`flex gap-2 items-baseline bg-yellow-100 px-2 border-l-4 border-l-${lineId} pr-4`}
      onMouseEnter={() => handleHover(reason, true)}
      onMouseLeave={() => handleHover(reason, false)}
      onTouchStart={() => handleHover(reason, true)}
      onTouchEnd={() => handleHover(reason, false)}
    >
      <p className="select-none">⚠️</p>
      <p className="text-xs text-gray-black whitespace-nowrap select-none">
        {lineStatusDescription}
      </p>
    </div>
  );
};

export default WarningBadge;
