import { useState, useRef } from "react";

function App() {
  const smallItemsCount = 6;
  const radius = 400;
  const stepAngle = 360 / smallItemsCount;
  const [rotation, setRotation] = useState(0);

  const dragStartX = useRef(null);
  const dragging = useRef(false);
  const hasRotated = useRef(false);

  const smallItems = Array.from({ length: smallItemsCount });

  function onMouseDown(e) {
    if (!e.target.classList.contains("bg-blue-500")) return;
    dragStartX.current = e.clientX;
    dragging.current = true;
    hasRotated.current = false;
  }

  function onMouseMove(e) {
    if (!dragging.current || hasRotated.current) return;

    const diffX = e.clientX - dragStartX.current;
    const threshold = 10;

    if (Math.abs(diffX) > threshold) {
      setRotation((prev) => prev + (diffX > 0 ? stepAngle : -stepAngle));
      hasRotated.current = true;
    }
  }

  function onMouseUp(e) {
    dragging.current = false;
    hasRotated.current = false;
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 select-none"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <h1 className="text-6xl uppercase mb-10">Hola Mundo</h1>

      <div
        className="relative w-[500px] h-[500px]"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.7s ease",
          cursor: dragging.current ? "grabbing" : "grab",
        }}
        onMouseDown={onMouseDown}
      >
        {/* Llanta */}
        <img
          src="Llanta.png"
          alt="Llanta"
          className="absolute top-1/2 left-1/2 w-[400px] h-auto -translate-x-1/2 -translate-y-1/2"
          draggable={false}
        />

        {smallItems.map((_, i) => {
          const fixedAngles = [0, 60, 120, 180, -120, -60];
          const angle = fixedAngles[i];
          const adjustedAngle = angle - 90; // Aquí el ajuste para que 0° quede arriba

          const x = radius * Math.cos((adjustedAngle * Math.PI) / 180);
          const y = radius * Math.sin((adjustedAngle * Math.PI) / 180);

          return (
            <div
              key={i}
              className="absolute w-[250px] h-[250px] bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold select-none cursor-pointer active:cursor-grabbing"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                userSelect: "none",
              }}
              draggable={false}
            >
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
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
