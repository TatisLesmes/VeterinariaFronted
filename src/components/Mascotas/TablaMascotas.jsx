import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import PropietariosMascotas from "./PropietariosMascotas";
import EditarMascota from "./EditMascotas";
import EliminarMascota from "./DeleteMascotas";
import ModalMascota from "./ModalMascota";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";

const TablaMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [flag, setFlag] = useState(false);
  const [mascotaSearch, setMascotaSearch] = useState("");
  const [originalMascota, setOriginalMascota] = useState([]); // Mantén una copia de respaldo de los eventos originales

  useEffect(() => {
    loadTable();
  }, [flag]);

  useEffect(() => {
    if (mascotaSearch) {
      searchEvents();
    } else {
      loadTable();
    }
  }, [mascotaSearch]);

  const searchEvents = () => {
    // Filtrar los eventos originales según el valor de búsqueda
    const filterMascota = originalMascota.filter((event) => {
      // Convertir el id del evento y el valor de búsqueda en cadenas
      const mascotaIdString = event.id.toString();
      const searchIdString = mascotaSearch.toString();

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
    fetch("https://back-proyecto-segundo-cicnuenta.vercel.app/mascota/")
      .then((response) => response.json())
      .then((result) => {
        setMascotas(result.data);
        setOriginalMascota(result.data); // Guarda una copia de los eventos originales
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
            setMascotaSearch(value);
          }
        }}
      />
      <ModalMascota setFlag={setFlag} />
    </div>
  );

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between ">
      <span className="text-xl text-900 font-bold">Mascotas</span>
    </div>
  );
  const footer = `En total hay ${mascotas ? mascotas.length : 0
    } mascotas.`;

  return (
    <Card title={search} style={{ margin: "15px" }}>
      <DataTable
        value={mascotas}
        header={header}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
        sortField="id"
        sortOrder={1}
      >
        <Column field="id" header="id"></Column>
        <Column field="nombre" header="Nombre"></Column>
        <Column field="tipo" header="tipo"></Column>
        <Column
          header="Propietarios"
          body={(rowData) => (
            <PropietariosMascotas rowData={rowData} />
          )}
        ></Column>
        <Column
          header="Editar"
          body={(rowData) => (
            <EditarMascota rowData={rowData} setFlag={setFlag} />
          )}
        ></Column>
        <Column
          header="Eliminar"
          body={(rowData) => (
            <EliminarMascota rowData={`https://back-proyecto-segundo-cicnuenta.vercel.app/mascota/${rowData._id}`} setFlag={setFlag} />
          )}
        ></Column>
      </DataTable>
    </Card>
  );
};

export default TablaMascotas;