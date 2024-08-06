import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const RegistroServicios= ({rowData}) => {
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState();
  useEffect(()=>{
    setRow(rowData.servicio)
  },[])
  return (
    <div className="card flex justify-content-center">
      <Button
        label="servicio"
        icon="pi pi-users"
        severity="info"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="servicio"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="card">
          <div>Nombre: {rowData.servicio.nombre}</div>
          <div>Descripcion:{rowData.servicio.descripcion}</div>
          <div>Costo: {rowData.servicio.costo}</div>
          
        </div>
      </Dialog>
    </div>
  );
};

export default RegistroServicios;