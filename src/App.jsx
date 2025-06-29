import { useState, useRef } from "react";
import { Card } from "./components/Card";
import { items } from "./data/itemsData";

function App() {
  const stepAngle = 360 / items.length;
  const [rotation, setRotation] = useState(0);

  const dragStartX = useRef(null);
  const dragging = useRef(false);
  const hasRotated = useRef(false);

  function onMouseDown(e) {
    if (!e.target.closest("[data-draggable]")) return;
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

  const fixedAngles = [0, 60, 120, 180, -120, -60];

 return (
    <>
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-black select-none overflow-hidden relative"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Contenedor de recorte */}
        <div className="relative w-full h-1/2">
          {/* Contenedor de la rueda */}
          <div
            className="relative w-[500px] h-[500px] mx-auto"
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

            {/* Cards */}
            {items.map((item, index) => (
              <Card key={index} text={item.text} i={index} />
            ))}

            {/* Círculo rojo */}
            <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] border border-red-800 rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />

            {/* Puntos rojos */}
            {fixedAngles.map((angle, index) => {
              const radius = 225;
              const rad = (angle - 90) * (Math.PI / 180);
              const x = radius * Math.cos(rad);
              const y = radius * Math.sin(rad);

              return (
                <div
                  key={index}
                  className="absolute w-1 h-1 bg-red-500 rounded-full z-20"
                  style={{
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Div oscuro inferior */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black  z-30">
        </div>
      </div>
    </>
  );
}

export default App;
