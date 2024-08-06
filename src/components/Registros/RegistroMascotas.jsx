import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const RegistroMascotas= ({rowData}) => {
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState();
  useEffect(()=>{
    setRow(rowData.mascota)
  },[])
  return (
    <div className="card flex justify-content-center">
      <Button
        label="Mascotas"
        icon="pi pi-users"
        severity="info"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="mascotas"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="card">
          <div>Nombre: {rowData.mascota.nombre}</div>
          <div>tipo: {rowData.mascota.tipo}</div>
         
        </div>
      </Dialog>
    </div>
  );
};

export default RegistroMascotas;