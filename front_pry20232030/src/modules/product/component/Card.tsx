/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@mui/material';

const Card = ({ quantity, title, style }: any) => {
    return (
        <div className={`bg-white rounded-md py-8 px-4 b-shadow-card ${style}`}>
            <p className='text-xl font-bold text-[#808080]'>{title}</p>
            <Typography variant="h4" component='h1' className='!font-bold !text-[3.125rem]'>
                {quantity}
            </Typography>
        </div>
    )
}

export default Card