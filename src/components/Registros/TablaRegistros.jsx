import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import RegistroMascotas from "./RegistroMascotas"
import RegistroServicios from "./RegistroServicios"
import EditarRegistros from "./EditRegistros";
import EliminarRegistros from "./DeleteRegistros";
import ModalRegistros from "./ModalRegistros";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";

const TablaRegistros = () => {
  const [registros, setRegistros] = useState([]);
  const [flag, setFlag] = useState(false);
  const [registroSearch, setRegistroSearch] = useState("");
  const [originalRegistro, setOriginalRegistro] = useState([]); // Mantén una copia de respaldo de los eventos originales

  useEffect(() => {
    loadTable();
  }, [flag]);

  useEffect(() => {
    if (registroSearch) {
      searchEvents();
    } else {
      loadTable();
    }
  }, [registroSearch]);

  const searchEvents = () => {
    // Filtrar los eventos originales según el valor de búsqueda
    const filterMascota = originalRegistro.filter((event) => {
      // Convertir el id del evento y el valor de búsqueda en cadenas
      const mascotaIdString = event.id.toString();
      const searchIdString = registroSearch.toString();

      // Verificar si el id del evento coincide con el valor de búsqueda en orden exacto
      if (mascotaIdString.length >= searchIdString.length) {
        for (let i = 0; i < searchIdString.length; i++) {
          if (mascotaIdString[i] !== searchIdString[i]) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    });

    // Actualizar el estado de los eventos filtrados
    setMascotas(filterMascota);
  };

  const loadTable = () => {
    fetch("https://back-proyecto-segundo-cicnuenta.vercel.app/registro/")
      .then((response) => response.json())
      .then((result) => {
        setRegistros(result.data);
        setOriginalRegistro(result.data); // Guarda una copia de los eventos originales
        setFlag(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const search = (
    <div style={{ display: "flex" }}>
      <InputText
        style={{ width: "100%" }}
        placeholder="Ingrese el ID a buscar"
        onKeyUp={(e) => {
          const value = e.target.value;
          const regex = /^[0-9]*$/; // Expresión regular para aceptar solo números
          if (regex.test(value)) {
            setRegistroSearch(value);
          }
        }}
      />
      <ModalRegistros setFlag={setFlag} />
    </div>
  );

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">Registros</span>
    </div>
  );
  const footer = `En total hay ${registros ? registros.length : 0
    } registros de mascotas.`;

  return (
    <Card title={search} style={{ margin: "15px" }}>
      <DataTable
        value={registros}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
        sortField="id"
        sortOrder={1}
      >
        <Column field="id" header="id"></Column>
        <Column field="fecha" header="fecha"></Column>
        <Column field="peso" header="peso"></Column>
        <Column field="temperatura" header="temperatura"></Column>
        <Column
          header="Mascota"
          body={(rowData) => (
            <RegistroMascotas rowData={rowData} />
          )}
        ></Column>
        <Column
          header="Servicio"
          body={(rowData) => (
            <RegistroServicios rowData={rowData} />
          )}
        ></Column>
        <Column
          header="Editar"
          body={(rowData) => (
            <EditarRegistros rowData={rowData} setFlag={setFlag} />
          )}
        ></Column>
        <Column
          header="Eliminar"
          body={(rowData) => (
            <EliminarRegistros rowData={`https://back-proyecto-segundo-cicnuenta.vercel.app/registro/${rowData._id}`} setFlag={setFlag} />
          )}
        ></Column>
      </DataTable>
    </Card>
  );
};

export default TablaRegistros;