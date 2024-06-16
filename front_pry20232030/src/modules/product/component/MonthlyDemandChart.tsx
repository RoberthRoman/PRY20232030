/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import { orderDate } from '../helper/orderDate';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);


// eslint-disable-next-line react-refresh/only-export-components
export const options = {
	responsive: true,
	aspectRatio: 2,
	plugins: {
		legend: {
			display: false,
		}
	},
};

const MonthlyDemandChart = ({ historial, prediction }: any) => {
	const orderDateList = orderDate(historial);

	const CANTIDAD_PREDICHA = prediction;
	const monthYear = orderDateList.map(item => `${item.month} - ${item.year}`)
	monthYear.push('Siguiente mes');
	const quantity = orderDateList.map(item => `${item.sales_quantity}`)
	quantity.push(CANTIDAD_PREDICHA);

	const numColores = monthYear.length;
	const colorComun = '#FF954A'; // Color común para la mayoría de los elementos
	const colorDiferente = '#42D885'; // Color diferente para el último elemento

	const backgroundColor = Array.from({ length: numColores }, (_, index) => index === numColores - 1 ? colorDiferente : colorComun);

	const labels = monthYear;
	const data = {
		labels: labels,
		datasets: [{
			data: quantity,
			backgroundColor: backgroundColor
		}]
	};

	return (
		<div className='bg-white px-10 py-10 space-y-10 b-shadow-card mb-10'>
			<Typography component='h2'>Kilos vendidos por mes</Typography>
			<div className='flex justify-evenly'>
				<div className='flex'>
					<p className='bg-[#FF954A] w-10 h-full mr-2'></p>
					<p> Kilos por mes</p>
				</div>
				<div className='flex items-center'>
					<p className='bg-[#42D885] w-10 h-full mr-2'></p>
					<p>Predicción</p>
				</div>
			</div>
			<div className='flex justify-center '>
				<div className='w-[70%]'>
					<Bar options={options} data={data} />
				</div>
			</div>
		</div>
	)
}

export default MonthlyDemandChart
