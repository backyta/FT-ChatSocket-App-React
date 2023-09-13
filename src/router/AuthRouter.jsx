import {  Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"

import '../css/login-register.css' // cuando carge el auth router tenemos el css listo


export const AuthRouter = () => {
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          <Routes>
            {/* en AppRouter tenemos /auth/* que va manejar las rutas anidadas */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element= { <Navigate to='/login' /> } />
        </Routes>
        </div>
      </div>
    </div>
  )
}


//* Esto usamos porque en los 3 rutas usamops estos 3 div de html con sus clases para que se vena bien
//* pero podria hacerse independiente en su mismo componente para eviitar este archivo y hacer solo
//* un browser Router con las rutas protegias de privada y publica