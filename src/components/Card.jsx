export const Card = ({ text, i, isActive }) => {
  const radius = 310;
  const fixedAngles = [0, 60, 120, 180, -120, -60];
  const angle = fixedAngles[i];
  const adjustedAngle = angle - 90;

  const x = radius * Math.cos((adjustedAngle * Math.PI) / 180);
  const y = radius * Math.sin((adjustedAngle * Math.PI) / 180);

  return (
    <div
      data-draggable
      className={`z2 absolute w-[170px] h-[150px] rounded-2xl flex items-center justify-center font-bold select-none cursor-pointer active:cursor-grabbing transition-all duration-300 ${
        isActive
          ? "bg-white shadow-2xl scale-110 z-20 w-[280px] h-[260px]"
          : "bg-gray-200 opacity-60 z-10"
      }`}
      style={{
        top: `calc(50% + ${y}px)`,
        left: `calc(50% + ${x}px)`,
        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
        userSelect: "none",
      }}
      draggable={false}
    >
      <div>
        <img
          src="021.jpg"
          alt="Activity Image"
          className="px-[10px]"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "inherit",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
        />
        <h2
          className={`text-black tracking-wide text-center mt-3 transition-all duration-300 ${
            isActive ? "text-xl" : "text-xs"
          }`}
        >
          {text}
        </h2>
      </div>
    </div>
  );
};
