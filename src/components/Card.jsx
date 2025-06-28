
export const Card = ({ text }) => {

    const activities = [
        'Bosque Privado',
        'Piscina Termal',
        'Grupos Reducidos',
        'Experiencia Exclusiva',
        'Prioridad: Seguridad',
        'Vistas Únicas'
    ]

  return (
    <div className="bg-white p-5">
        <img src="021.jpg" alt="Quad Image" />
        <h1>{ text }</h1>
    </div>
  )
}
