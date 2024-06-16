/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, MonthlyDemandChart, TitleDash, TitleWInfo } from "..";
import { apiService, getLoginUser } from "../../../shared";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from 'react-router-dom';
/* import { IconDelete } from "../../../shared"; */

/* const actionSelect = (width: number) => ({
  field: 'actions',
  headerName: 'Acciones',
  width: width,
  renderCell: () => (
    <div>
      <button onClick={() => console.log('Hola')} className="ml-6"><IconDelete /></button>
    </div >
  ),
}); */

const getProducts = async () => {
  const { id } = getLoginUser()
  const products = await apiService.get(`/users/${id}/products`);
  return products;
}

const getMetricsForProduct = async (id: any) => {
  const movement: any = await apiService.get(`products/${id}`);
  return movement.body;
}

const ProductDashboards = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  let catalog: any = null
  let productSelect: any = null
  const hoverText = `Esta sección ofrece un resumen del rendimiento financiero y la actividad de ventas del inventario. 'Total Ganado' refleja las ganancias totales de las ventas. 'Kilos Vendidos' indica la cantidad de producto vendido en kilogramos. 'Total Invertido' muestra la inversión total en la compra de inventario. 'Kilos Comprados' representa la cantidad total de producto adquirido para la venta. Juntos, estos indicadores proporcionan una visión clara de la salud financiera y la eficacia operativa del negocio.`
  const hoverText2 = `Esta sección muestra una proyección de ventas basada en datos históricos y tendencias del mercado. 'Kilos vendidos por mes' representa la cantidad total de producto vendido cada mes, mientras que 'Kilos por mes' muestra el número de transacciones realizadas. 'Kilos estimados' refleja las proyecciones de ventas futuras, ayudando a anticipar la demanda y a planificar la gestión de inventario de manera más efectiva. Estos datos son cruciales para la toma de decisiones estratégicas en compras y producción.`

  const { isLoading, data }: any = useQuery(
    ['products'],
    () => getProducts(),
  )

  if (!isLoading) {
    const namesArray = data.body.data.map((item: {
      name: any; id: any;
    }) => ({ name: item.name, id: item.id }));
    queryClient.setQueryData(['listProductsPurchase'], namesArray);

    catalog = queryClient.getQueryData(['listProductsPurchase']);

    productSelect = catalog.find((item: { id: string | undefined; }) => item.id == id)
  }

  const { isLoading: isLoadingMetric, data: dataMetric } = useQuery(
    ['productInfo', id],
    () => getMetricsForProduct(id),
    {
      refetchOnWindowFocus: false,
    }
  )

  if (!isLoadingMetric) {
    console.log(dataMetric);
    console.log(dataMetric.yearHistory);
    console.log(dataMetric.analytics.totalSales);
  }

  function formatearPrecio(numero: number | bigint) {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(numero);
  }

  return (
    isLoading || isLoadingMetric ? (
      <p>Loading...</p>
    ) : (
      <div className="rounded-md mx-4 space-y-4 " >
        <div className='bg-[#F1F0F0] py-4 rounded-md custom-shadow'>
          <TitleDash
            nameAction="Mirando"
            nameObject={productSelect.name}
            listCata={catalog}
          />
        </div>

        <div className="bg-white rounded-md pt-4 overflow-y-auto space-y-4" style={{ height: '55vh' }}>
          <div className="space-y-4 mx-4">

            <TitleWInfo
              title='Información de Inventario'
              infoHover={hoverText}
              style='basis-[55%]'
            />

            <div className='grid grid-cols-2 gap-10'>
              <Card
                quantity={formatearPrecio(dataMetric.analytics.totalEarnings)}
                title='Total Ganado'
              />
              <Card
                quantity={formatearPrecio(dataMetric.analytics.totalInvested)}
                title='Total Invertido'
              />
              <Card
                quantity={dataMetric.analytics.totalSales}
                title='Kilos Vendidos'
                style=''
              />
              <Card
                quantity={dataMetric.analytics.totalPurchases}
                title='Kilos Comprados'
                style=''
              />
            </div>
          </div>

          <div className="mx-4 space-y-4">
            <TitleWInfo
              title='Prediccion de Ventas'
              infoHover={hoverText2}
              style='basis-[60%]'
            />

            {dataMetric.predictions !== null ? (
              <MonthlyDemandChart historial={dataMetric.yearHistory} prediction={parseInt(dataMetric.predictions.result)} />
            ) : (
              <div className='bg-white rounded-md py-8 px-4 b-shadow-card'>
                <p className='!font-bold !text-[3.125rem]'>No hay suficientes transacciones para la operación</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  )
}

export default ProductDashboards