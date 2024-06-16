/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field } from "formik";
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Table, TitlePanel, useModal } from "..";
import { apiService, getLoginUser } from "../../../shared";
import { Modal, Box, MenuItem, TextField, Button, Typography } from '@mui/material';
import * as Yup from 'yup';
import Swal from 'sweetalert2'

const getProducts = async () => {
  const { id } = getLoginUser()
  const products = await apiService.get(`/users/${id}/products`);
  return products;
}

const getLoads = async () => {
  const { id } = getLoginUser()
  const loads = await apiService.get(`/users/${id}/transactions`);
  return loads;
}

const ProductSales = () => {
  const { open, handleOpen, handleClose, style } = useModal();
  const queryClient = useQueryClient();
  const products: number | any = queryClient.getQueryData(['products']);
  let productSelect: any = null
  let stockProduct: any = null

  function formatearFecha(fecha: string | number | Date) {
    const dateObj = new Date(fecha);
    const dia = dateObj.getDate().toString().padStart(2, '0');
    const mes = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Enero es 0
    const año = dateObj.getFullYear();
    return `${dia}/${mes}/${año}`;
  }

  const actionEdit = (width: number) => ({
    field: 'actions',
    headerName: 'Acciones',
    width: width,
    renderCell: (params: { row: { id: number; }; }) => (
      <div>
        <button onClick={() => handleSaveOrUpdate(params.row.id)} className="bg-[#EBEFFF] border border-[#BAC9FE] text-[#3E66FB] py-2 px-8 rounded-md">Editar</button>
      </div>
    ),
  });

  const actionDelete = (width: number) => ({
    
    width: width,
    renderCell: (params: { row: { id: number; }; }) => (
      <div>
        <button onClick={() => handleDelete(params.row.id)} className="bg-[#EBEFFF] border border-[#BAC9FE] text-[#F63032] py-2 px-8 rounded-md">Borrar</button>
      </div >
    ),
  });

  const columns = [
    { field: 'id', headerName: 'Id', width: 80 },
    { field: 'name', headerName: 'Producto', width: 220 },
    { field: 'unitPrice', headerName: 'Precio (S/.)', width: 150 },
    { field: 'date', headerName: 'Fecha', width: 150 },
    { field: 'quantity', headerName: 'Salidas (Kg)', width: 150 },
    actionEdit(170),
    actionDelete(190)
  ];

  const intial = {
    selectField: '', //ACA ES EL NOMBRE
    quantity: '',
    price: '',
  }  //REEMPLAZAR POR LO QUE PEDIRA CADA MODULO

  const handleSaveOrUpdate = async (values: any) => {
    queryClient.setQueryData(['productId'], values);

    const productsQuery: any = queryClient.getQueryData(['products']);

    //console.log(productsQuery);

    if (productsQuery) {
      const filteredProducts = productsQuery.body.data.filter((product: { id: number; }) => product.id === values);

      //console.log(filteredProducts);

      queryClient.setQueryData(['productSelect'], filteredProducts[0])
    }

    handleOpen();
  }

  const { isLoading, data }: any = useQuery(
    ['products'],
    () => getProducts(),
  )

  const { isLoading: isLoadingLoads, data: dataLoads }: any = useQuery(
    ['salesProducts'],
    getLoads,
    {
      select(data: any) {
        const salidaArray = data.body.data
          .filter((item: { type: { name: string; }; }) => item.type.name === "Salida")
          .map((item: { id: any; product: { name: any; }; unitPrice: any; date: any; quantity: any; }) => ({
            id: item.id,
            name: item.product.name,
            unitPrice: item.unitPrice,
            date: formatearFecha(item.date),
            quantity: item.quantity * -1
          }));

        console.log('Salida:', salidaArray);
        return salidaArray
      },
    }
  )

  if (!isLoading) {
    const namesArray = data.body.data.map((item: {
      name: any; id: any;
    }) => ({ name: item.name, id: item.id }));
    queryClient.setQueryData(['listProductsPurchase'], namesArray);

    productSelect = queryClient.getQueryData(['listProductsPurchase']);
  }

  const handleSubmit = async (values: any) => {
    if (parseInt(values.quantity) < stockProduct[0].stock) {
      const nuevaCopia = {
        "quantity": values.quantity,
        "unitPrice": values.price,
      };

      await apiService.post(`/products/${values.selectField}/withdraw`, nuevaCopia)

      queryClient.invalidateQueries(['salesProducts']);
    } else {
      //CO COLOCAR ALERT
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Oops...`,
        text: `Solo hay ${stockProduct[0].stock} productos`,
        showConfirmButton: false,
        backdrop: false,
        timer: 2500,
      })
    }

    handleClose();
  }

  const handleDelete = async (value: any) => {
    await apiService.delete(`/transactions/${value}`)
    queryClient.invalidateQueries(['salesProducts']);
  }

  const validationSchema = Yup.object().shape({
    selectField: Yup.string().required('Este campo es requerido'),
    quantity: Yup.number()
      .positive('La cantidad debe ser un número positivo')
      .required('Este campo es requerido'),
    price: Yup.number()
      .positive('El precio debe ser un número positivo')
      .required('Este campo es requerido'),
  });

  return (
    <div className="mx-4 rounded-md relative">
      <div className="bg-[#F1F0F0] pt-4 rounded-md custom-shadow">
        <TitlePanel
          nameAction="Gestionar"
          nameObject="Venta"
          nameBtn="Nueva Venta"
          modalOpen={handleOpen}
        />

        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <Typography variant="h4" component='h1'>Registrar Compra</Typography>
            <hr className='my-2 mx-[-2rem]' />
            <Formik
              initialValues={intial}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form className='space-y-4'>
                  <Field
                    as={TextField}
                    name="selectField"
                    label="Campo Select"
                    select
                    error={touched.selectField && !!errors.selectField}
                    helperText={touched.selectField && errors.selectField}
                    fullWidth
                    margin="normal"
                    onChange={(event: { target: { value: any; }; }) => {
                      const selectedValue = event.target.value;
                      setFieldValue('selectField', selectedValue);

                      // Actualizar estado o realizar acciones adicionales aquí
                      stockProduct = products.body.data.filter((product: { id: any; }) => product.id === selectedValue);
                      console.log(stockProduct[0].stock);

                      queryClient.setQueryData(['stock'], stockProduct[0].stock);
                    }}
                  >
                    {/* Aquí agregarías los <MenuItem> para tus opciones */}
                    <MenuItem value="">Seleccione un producto</MenuItem>
                    {productSelect.map((item: any) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Field>

                  <Field
                    as={TextField}
                    name="quantity"
                    label="Cantidad"
                    error={touched.quantity && !!errors.quantity}
                    helperText={touched.quantity && errors.quantity}
                    fullWidth
                    margin="normal"
                  />

                  <Field
                    as={TextField}
                    name="price"
                    label="Precio"
                    error={touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                    fullWidth
                    margin="normal"
                  />

                  <div className='flex w-[80%] mx-auto space-x-8'>
                    <Button variant="contained" className='!bg-[#C3EE65] !text-black' fullWidth onClick={() => handleClose()}>
                      Cancelar
                    </Button>

                    <Button type="submit" variant="contained" className='!bg-[#57B6FF]' fullWidth>
                      Aceptar
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>

        <hr className="mt-[1rem] mb-4" />
      </div>

      <div className="bg-white rounded-md custom-shadow overflow-y-auto" style={{ height: '60vh' }}>
        {isLoadingLoads ? (
          <p>loading</p>
        ) : (
          <div className='mx-16 py-5' style={{ width: '1100px', height: '500px' }}>
            <h2 className='text-2xl mb-5 uppercase font-bold'>Productos Agricolas</h2>
            <div className='max-w-full b-shadow-table' >
              <Table rows={dataLoads} columns={columns} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductSales