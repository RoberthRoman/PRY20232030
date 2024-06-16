/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field } from 'formik';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Table, TitlePanel, useModal } from "..";
import { apiService, getLoginUser } from "../../../shared";
import { useQuery, useQueryClient } from "@tanstack/react-query"

const getProducts = async () => {
  const { id } = getLoginUser()
  const products = await apiService.get(`/users/${id}/products`);
  return products;
}

const RegisterProduct = () => {
  const { open, handleOpen, handleClose, style } = useModal();
  const queryClient = useQueryClient();

  const productSelect: any = queryClient.getQueryData(['productSelect']);

  const { isLoading, data }: any = useQuery(
    ['products'],
    () => getProducts(),
  )

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
      </div>
    ),
  });

  const columns = [
    { field: 'id', headerName: 'Id'},
    { field: 'name', headerName: 'Nombre', width: 450 },
    actionEdit(170), actionDelete(190)
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Este campo es requerido')
    .matches(/^[^0-9]+$/, 'El nombre del producto no puede contener números'),
  });

  const initial = {
    name: productSelect?.name ?? ''
  };

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

  const handleSubmit = async (values: any) => {
    const productId = queryClient.getQueryData(['productId']);

    if (productId !== undefined) {
      await apiService.put(`/products/${productId}`, values)
      queryClient.invalidateQueries(['products']);
    } else {
      await apiService.post('/products', values)
      queryClient.invalidateQueries(['products']);
    }

    handleClose();
  };

  const handleDelete = async (value: any) => {
    await apiService.delete(`/products/${value}`)
    queryClient.invalidateQueries(['registerProducts']);
  }

  return (
    isLoading ? (
      <p>Loading...</p>
    ) : (
      <body>
        
      <div className="mx-4 rounded-md relative">
        <div className='bg-[#F1F0F0] pt-4 rounded-md custom-shadow'>
          <TitlePanel
            nameAction="Gestionar"
            nameObject="Producto"
            nameBtn="Nuevo Producto"
            modalOpen={handleOpen}
          />

          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <>
                <Typography variant="h4" component='h1'>{productSelect ? 'Editar Producto' : 'Registrar Producto'}</Typography>
                <hr className='my-2 mx-[-2rem]' />
                <Formik
                  initialValues={initial}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched }) => (
                    <Form className='space-y-4'>
                      <Field as={TextField} name="name" label="Nombre" error={touched.name && !!errors.name} helperText={touched.name && errors.name} fullWidth margin="normal" />
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
              </>
            </Box>
          </Modal>

          <hr className="mt-[1rem] mb-4" />
        </div>

        <div className="bg-white rounded-md custom-shadow overflow-y-auto" style={{ height: '60vh' }}>
          <div className='mx-auto py-5' style={{ width: '900px', height: '500px' }}>
            <h2 className='text-2xl mb-5 uppercase font-bold'>Productos Agrícolas</h2>
              <div className=' max-w-full custom-shadow'>
              <Table rows={data.body.data} columns={columns} />
              </div>
            </div>
          </div>
        </div>
      </body>
    )
  );
};

export default RegisterProduct;
