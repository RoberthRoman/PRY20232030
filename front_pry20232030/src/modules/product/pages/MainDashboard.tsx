import bgInicio from '/bg-inicio.png'

const MainDashboard = () => {
  return (
    <div className="mx-4 rounded-md relative" >
        <div className="bg-white rounded-md custom-shadow" style={{ height: '600px' }}>
          <p className="text-[#667080] font-bold text-4xl mx-4">¡Bienvenido a MarketProphet!</p>
          <p className="text-[#667080] font-bold text-2xl mx-4 mt-2">¡Tu sistema de predicción de ventas más confiable y el único profeta del mercado mayorista!</p>
          <p className="text-[#EEA35E] font-bold text-xl mx-4 mt-4 mb-4">¿Que deseas realizar?</p>

          <div className='flex justify-center'>
          <img src={bgInicio} alt="Inicio png" width={500} height={10} className='mb-6'/>
          </div>
        </div>
      </div>
  )
}

export default MainDashboard