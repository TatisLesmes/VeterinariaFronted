import React from "react";
import ReactDOM from "react-dom/client";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"; //estilos
import "primeicons/primeicons.css"; //iconos
import Router from "./routes/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(<Router />);