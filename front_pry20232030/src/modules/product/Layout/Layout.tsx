import { Outlet } from "react-router-dom"
import Header from "../component/Header"

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="pt-4 h-screen background-image-opacity">
        <div className="background-image-opacity-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout