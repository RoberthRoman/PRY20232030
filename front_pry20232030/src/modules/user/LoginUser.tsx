import { Grid, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ApiResponse, apiService, setAccessToken, setLoginUser, setRefreshToken } from '../../shared';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import bgLogin from '/bg-login.png';
import marketprophetLogo from '/marketprophetLogo.png';

type UserLogin = {
  email: string;
  password: string;
};

type UserLoginResponse = {
  user: string;
  accessToken: string;
  refreshToken: string;
};

const LoginUser = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Correo electrónico no válido').required('Este campo es requerido'),
    password: Yup.string().required('Este campo es requerido'),
  });

  const initialValues: UserLogin = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: UserLogin) => {
    try {
      const response = await apiService.post<ApiResponse<UserLoginResponse>>('/auth/login', values);
      if (response.status === 200) {
        const { accessToken, refreshToken, user } = response.body;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setLoginUser(user);
        navigate('/inicio');
      } else {
        throw new Error('Inicio de sesión fallido');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Advertencia',
        text: 'Usuario y/o contraseña no registrados',
      });
    }
  };

  return (
    <Grid container className="h-screen">
      <Grid item xs={12} md={6} className="bg-[#42D885] flex justify-center">
        <div className="w-full md:w-4/5 lg:w-3/5 px-4 py-8">
          <div className="flex flex-col items-center">
            <img src={marketprophetLogo} alt="Logo" className="w-50vw md:w-2/3 lg:w-1/3 mb-4" />
            <Typography variant="h2" className="text-lg md:text-xl lg:text-2xl text-center text-[#666666] mb-4 font-bold">
              Bienvenido a <span className="font-bold">MarketProphet</span>
            </Typography>
            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="w-full">
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <Field
                      as={TextField}
                      name="email"
                      label="Usuario"
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      fullWidth
                      size="small"
                      variant="outlined"
                    />
                    <Field
                      as={TextField}
                      type="password"
                      name="password"
                      label="Contraseña"
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      fullWidth
                      size="small"
                      variant="outlined"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="!bg-[#666666] !font-bold !py-2 md:!py-3 text-base md:text-lg" /* Restauramos el tamaño del botón */
                  >
                    Iniciar Sesión
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={6} className="hidden md:flex items-center justify-center">
        <img src={bgLogin} alt="Login IMG" className="w-full h-full object-cover" />
      </Grid>
    </Grid>
  );
  
      
};

export default LoginUser;
