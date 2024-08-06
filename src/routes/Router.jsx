//import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mascota from "../pages/Mascota"
import Registro from "../pages/Registros";
import Home from "../pages/Home";
import Propietario from "../pages/Propietario";
import Servicio from "../pages/Servicio";


const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/mascota" Component={Mascota} />
        <Route path="/registro" Component={Registro} />
        <Route path="/propietario" Component={Propietario} />
        <Route path="/servicio" Component={Servicio} />

      </Routes>
    </BrowserRouter>
  );
};

export default routes;