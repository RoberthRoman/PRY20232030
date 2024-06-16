/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLoginUser, removeAccessToken, removeLoginUser, removeRefreshToken } from '../../../shared';
import logoAgro from '/marketprophetLogo.png'
import { Link, useNavigate } from 'react-router-dom';
import { SetStateAction, useState } from "react";

const Header = () => {
    const { firstName, lastName } = getLoginUser();
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState('/inicio'); // Inicializa el estado con la ruta de inicio

    const handleLogout = () => {
        navigate('/login')
        removeAccessToken()
        removeRefreshToken()
        removeLoginUser()
    }


    const handleLinkClick = (path: SetStateAction<string>) => {
        setActiveLink(path); // Actualiza el estado cuando se hace clic en un enlace
    }

    return (
        <>
            <div className='flex items-center justify-between py-2 px-4 bg-[#C2C9D1]'>
                <div className='flex items-center' style={{ marginRight: '-200px' }}>
                    <div className='w-[4%]' >
                        <img src={logoAgro} alt="Logo" className='w-full' />
                    </div>
                    <button type='button'>MarketProphet</button>
                </div>
                <p className="text-center">{`Bienvenido ${firstName} ${lastName}`}</p>
                <button type='button' onClick={handleLogout} className='text-[#FF954A] font-bold'>Cerrar sesión</button>
            </div>

            <div className='grid grid-cols-5 gap-12 px-[1rem] bg-[#42D885] text-center text-lg'>
            <Link
                to='/inicio'
                className={`text-white font-bold py-4`}
                onClick={() => handleLinkClick('/inicio')}
                style={activeLink === '/inicio' ? { backgroundColor: 'rgba(255, 178, 102, 0.8)', color: 'black' } : {}}
            >
                Inicio
            </Link>
            <Link
                to='/registrar-producto'
                className={`text-white font-bold py-4`}
                onClick={() => handleLinkClick('/registrar-producto')}
                style={activeLink === '/registrar-producto' ? { backgroundColor: 'rgba(255, 178, 102, 0.8)', color: 'black' } : {}}
            >
                Gestionar Producto
            </Link>
            <Link
                to='/registro-compra'
                className={`text-white font-bold py-4`}
                onClick={() => handleLinkClick('/registro-compra')}
                style={activeLink === '/registro-compra' ? { backgroundColor: 'rgba(255, 178, 102, 0.8)', color: 'black' } : {}}
            >
                Gestionar Compra
            </Link>
            <Link
                to='/registro-venta'
                className={`text-white font-bold py-4`}
                onClick={() => handleLinkClick('/registro-venta')}
                style={activeLink === '/registro-venta' ? { backgroundColor: 'rgba(255, 178, 102, 0.8)', color: 'black' } : {}}
            >
                Gestionar Venta
            </Link>
            <Link
                to='/tablero-productos/1'
                className={`text-white font-bold py-4`}
                onClick={() => handleLinkClick('/tablero-productos/1')}
                style={activeLink === '/tablero-productos/1' ? { backgroundColor: 'rgba(255, 178, 102, 0.8)', color: 'black' } : {}}
            >
                Ver Producto
            </Link>
            </div>
        </>
    );
}

export default Header