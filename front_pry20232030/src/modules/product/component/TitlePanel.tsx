/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { Tooltip, Typography } from '@mui/material'
import IconProduct from '/iconProduct.svg'
import { useNavigate } from 'react-router-dom';


export const TitlePanel = ({ nameAction, nameObject, nameBtn, modalOpen }: any) => {
    return (
        <div className="flex mx-6 items-center justify-between">
            <div className='flex items-center space-x-4'>
                <img src={IconProduct} alt="" className='w-[10%] bg-[#FF5722] p-1 rounded-md' />
                <div className='w-[10rem] '>
                    <p className='text-base font-light leading-3'>{nameAction}</p>
                    <p className="text-3xl font-semibold">{nameObject}</p>
                </div>
            </div>

            <div>
                <button className="bg-[#eed1b5] border border-[#EC9647] text-[#EC9647] rounded-md w-[12rem] h-[3rem] font-bold text-xl" onClick={modalOpen}>{nameBtn}</button>
                {/* <button className="bg-[#EC9647] rounded-md w-[10rem] h-[3rem]" onClick={modalOpen}>{nameBtn}</button> */}
            </div>
        </div>
    )
}

export const TitleDash = ({ nameAction, nameObject, listCata }: any) => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        console.log('handleOptionChange - value:', value); // Log de depuración
        setSelectedOption(value);
    }, []);
    
    useEffect(() => {
        console.log('useEffect - selectedOption:', selectedOption); // Log de depuración
        if (selectedOption) {
            navigate(`/tablero-productos/${selectedOption}`);
        }
    }, [selectedOption, navigate]);
    

    return (
        <div className="flex mx-6 items-center justify-between">
            <div className='flex items-center space-x-4'>
                <img src={IconProduct} alt="" className='w-[10%] bg-[#FF5722] p-1 rounded-md' />
                <div className='w-[20rem] '>
                    <p className='text-base font-light leading-3'>{nameAction}</p>
                    <p className="text-3xl font-semibold">{nameObject}</p>
                </div>
            </div>
            <div className='w-[20%]'>
                <h2 className='pl-1 pb-2 text-xl font-bold'>Seleccion de Producto</h2>
                <select 
                    value={selectedOption} 
                    onChange={handleOptionChange} 
                    className='bg-white border border-[#EC9647] text-[#EC9647] font-bold w-full py-3 px-2 rounded-md'>
                    <option disabled value="">Selecciona una opción</option>
                    {listCata.map((item: any) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export const TitleWInfo = ({ title, infoHover, style, styleLine = 'basis-[50%]' }: any) => {
    return (
        <div className='flex items-center'>
            <Typography variant="h4" component='h1' className={`!font-bold !text-[30px] ${style}`}>
                {title}
            </Typography>
            <Tooltip
                title={infoHover}
                placement="bottom-start"
                componentsProps={{
                    tooltip: {
                        style: { backgroundColor: '#FFFFFF', color: '#42D885' },
                    },
                }}
            >
                {/* <p className='px-6'><IconHelp /></p> */}
                <p>?</p>
            </Tooltip>
            <hr className={`border border-[#42D885] ${styleLine}`} />
        </div>
    )
}