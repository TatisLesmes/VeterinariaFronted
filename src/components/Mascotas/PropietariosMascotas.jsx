import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const PropietariosMacotas = ({ rowData }) => {
  const [visible, setVisible] = useState(false);
  const [row, setRow] = useState();
  useEffect(() => {
    setRow(rowData.propietario)
  }, [])
  return (
    <div className="card flex justify-content-center">
      <Button
        label="Propietarios"
        icon="pi pi-users"
        severity="info"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="propietarios"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="card">
          <div>Nombre: {rowData.propietario.nombre}</div>
          <div>Apellido: {rowData.propietario.apellido}</div>
          <div>Telefono: {rowData.propietario.telefono}</div>
        </div>
      </Dialog>
    </div>
  );
};

export default PropietariosMacotas;