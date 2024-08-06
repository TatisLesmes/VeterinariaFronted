import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import EditarServicio from "./EditServicios";
import EliminarServicio from "./DeleteServicios";
import ModalServicio from "./ModalServicios";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";

const TablaServicios = () => {
    const [servicios, setServicios] = useState([]);
    const [flag, setFlag] = useState(false);
    const [servicioSearch, setServicioSearch] = useState("");
    const [originalServicio, setOriginalServicio] = useState([]); // Mantén una copia de respaldo de los eventos originales

    useEffect(() => {
        loadTable();
    }, [flag]);

    useEffect(() => {
        if (servicioSearch) {
            searchEventsS();
        } else {
            loadTable();
        }
    }, [servicioSearch]);


    const searchEventsS = () => {
        // Filtrar los eventos originales según el valor de búsqueda
        const filterServicio = originalServicio.filter((event) => {
            // Convertir el id del evento y el valor de búsqueda en cadenas
            const servicioIdString = event.id.toString();
            const searchIdString = servicioSearch.toString();

            // Verificar si el id del evento coincide con el valor de búsqueda en orden exacto
            if (servicioIdString.length >= searchIdString.length) {
                for (let i = 0; i < searchIdString.length; i++) {
                    if (servicioIdString[i] !== searchIdString[i]) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        });

        // Actualizar el estado de los eventos filtrados
        setServicios(filterServicio);
    };


    const loadTable = () => {
        fetch("https://back-proyecto-segundo-cicnuenta.vercel.app/servicio/")
            .then((response) => response.json())
            .then((result) => {
                setServicios(result.data);
                setOriginalServicio(result.data); // Guarda una copia de los eventos originales
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
                        setServicioSearch(value);
                    }
                }}
            />
            <ModalServicio setFlag={setFlag} />
        </div>
    );


    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between ">
            <span className="text-xl text-900 font-bold">Servicios</span>
        </div>
    );
    const footer = `En total hay ${servicios ? servicios.length : 0
        } servicios en la vetenrinaria.`;

    return (
        <Card title={search} style={{ margin: "15px" }}>
            <DataTable
                value={servicios}
                header={header}
                footer={footer}
                tableStyle={{ minWidth: "60rem" }}
                sortField="id"
                sortOrder={1}
            >
                <Column field="id" header="id"></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="descripcion" header="Descripción"></Column>
                <Column field="costo" header="Costo"></Column>

                <Column
                    header="Editar"
                    body={(rowData) => (
                        <EditarServicio rowData={rowData} setFlag={setFlag} />
                    )}
                ></Column>
                <Column
                    header="Eliminar"
                    body={(rowData) => (
                        <EliminarServicio rowData={`https://back-proyecto-segundo-cicnuenta.vercel.app/servicio/${rowData._id}`} setFlag={setFlag} />
                    )}
                ></Column>
            </DataTable>
        </Card>
    );


};

export default TablaServicios;