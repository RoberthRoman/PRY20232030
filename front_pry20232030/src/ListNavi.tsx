import { Link } from "react-router-dom"

const ListNavi = () => {
  return (
    <ul className="absolute top-[50%]">
      <li><Link to='/inicio'>Inicio</Link></li>
      <li><Link to='/registro-compra'>Compra</Link></li>
      <li><Link to='/registro-venta'>Venta</Link></li>
      <li><Link to='/tablero-productos/:1'>Producto</Link></li>
    </ul>
  )
}

export default ListNavi