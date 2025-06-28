import { useState } from 'react'

function App() {
  const smallItemsCount = 6
  const radius = 120

  // Ángulos personalizados para que dos divs estén arriba y abajo
  const angles = [90, 30, 330, 270, 210, 150]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl uppercase mb-10">Hola Mundo</h1>

      <div className="relative w-64 h-64">
        {/* Llanta principal en el centro */}
        <img
          src="Llanta.png"
          alt="Llanta"
          className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2"
        />

        {/* Elementos pequeños alrededor */}
        {angles.map((angle, i) => {
          const x = radius * Math.cos((angle * Math.PI) / 180)
          const y = radius * Math.sin((angle * Math.PI) / 180)

          return (
            <div
              key={i}
              className="absolute w-10 h-10 bg-blue-500 rounded-full"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
