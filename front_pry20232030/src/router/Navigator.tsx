import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Layout, MainDashboard, ProductDashboards, ProductPurchase, ProductSales, RegisterProduct } from "../modules/product"
//import ListNavi from "../ListNavi"
import { LoginUser } from "../modules/user"


const Navigator = () => {
    return (
        <BrowserRouter>
            {/* <ListNavi /> */}
            <Routes>
                <Route>
                    <Route path='/' element={<Navigate to='/login' replace />} />

                    <Route path='/login' element={<LoginUser />} />

                    <Route path='/' element={<Layout />}>
                        <Route path="/inicio" element={<MainDashboard />} />
                        <Route path="/registrar-producto" element={<RegisterProduct />} />
                        <Route path="/registro-compra" element={<ProductPurchase />} />
                        <Route path="/registro-venta" element={<ProductSales />} />
                        <Route path="/tablero-productos/:id" element={<ProductDashboards />} />
                        <Route path="*" element={'*'} />
                    </Route>
                </Route>
            </Routes>

        </BrowserRouter>
    )
}

export default Navigator