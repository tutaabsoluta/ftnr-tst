import { useState, useRef } from "react";
import { Card } from "./components/Card";
import { items } from './data/itemsData'

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
        {
          items.map( ( item, index ) => (
            <Card text={ item.text } i = { index } />
          ) )
        }
      </div>
    </div>
  );
}

export default App;
