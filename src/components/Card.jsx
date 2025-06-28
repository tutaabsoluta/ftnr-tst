export const Card = ({ text, i }) => {
  const radius = 400;

  const fixedAngles = [0, 60, 120, 180, -120, -60];
  const angle = fixedAngles[i];
  const adjustedAngle = angle - 90;

  const x = radius * Math.cos((adjustedAngle * Math.PI) / 180);
  const y = radius * Math.sin((adjustedAngle * Math.PI) / 180);

  return (
    <div
      key={i}
      data-draggable
      className="absolute w-[250px] h-[250px] bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold select-none cursor-pointer active:cursor-grabbing"
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
          alt=""
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
        <h2>{text}</h2>
      </div>
    </div>
  );
};
