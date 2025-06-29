import { useState, useRef, useEffect } from "react";
import { Card } from "./components/Card";
import { items } from "./data/itemsData";

function App() {
  const stepAngle = 360 / items.length;
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [delayedActiveIndex, setDelayedActiveIndex] = useState(0);

  const dragStartX = useRef(null);
  const dragging = useRef(false);
  const hasRotated = useRef(false);
  const timeoutRef = useRef(null);

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
      const direction = diffX > 0 ? 1 : -1;

      setRotation((prev) => prev + direction * stepAngle);

      setActiveIndex((prevIndex) => {
        let newIndex = (prevIndex - direction + items.length) % items.length;

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setDelayedActiveIndex(newIndex);
        }, 300);

        return newIndex;
      });

      hasRotated.current = true;
    }
  }

  function onMouseUp() {
    dragging.current = false;
    hasRotated.current = false;
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const fixedAngles = [0, 60, 120, 180, -120, -60];

  return (
    <>
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-black select-none overflow-hidden relative"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div
          className="relative w-[500px] h-[500px] mx-auto"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.7s ease",
            cursor: dragging.current ? "grabbing" : "grab",
          }}
          onMouseDown={onMouseDown}
        >
          <img
            src="Llanta.png"
            alt="Llanta"
            className="absolute top-1/2 left-1/2 w-[400px] h-auto -translate-x-1/2 -translate-y-1/2"
            draggable={false}
          />

          {items.map((item, index) => (
            <Card
              key={index}
              text={item.text}
              i={index}
              isActive={index === delayedActiveIndex}
            />
          ))}

          <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] border border-red-800 rounded-full -translate-x-1/2 -translate-y-1/2 z-10" />

          {fixedAngles.map((angle, index) => {
            const radius = 225;
            const rad = (angle - 90) * (Math.PI / 180);
            const x = radius * Math.cos(rad);
            const y = radius * Math.sin(rad);

            return (
              <div
                key={index}
                className="absolute w-1 h-1 bg-red-500 rounded-full z-10"
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

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black z-30"></div>
    </>
  );
}

export default App;
