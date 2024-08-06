import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import MascotasPropietario from "./MascotasPropietario";
import EditarPropietario from "./EditPropietario";
import EliminarPropietario from "./DeletePropietario";
import ModalPropietario from "./ModalPropietario";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";

const TablaPropietarios = () => {
    const [propietarios, setPropietarios] = useState([]);
    const [flag, setFlag] = useState(false);
    const [propietarioSearch, setPropietarioSearch] = useState("");
    const [originalPropietario, setOriginalPropietario] = useState([]); // Mantén una copia de respaldo de los eventos originales

    useEffect(() => {
        loadTable();
    }, [flag]);

    useEffect(() => {
        if (propietarioSearch) {
            searchEventsP();
        } else {
            loadTable();
        }
    }, [propietarioSearch]);


    const searchEventsP = () => {
        // Filtrar los eventos originales según el valor de búsqueda
        const filterPropietario = originalPropietario.filter((event) => {
            // Convertir el id del evento y el valor de búsqueda en cadenas
            const propietarioIdString = event.id.toString();
            const searchIdString = propietarioSearch.toString();

            // Verificar si el id del evento coincide con el valor de búsqueda en orden exacto
            if (propietarioIdString.length >= searchIdString.length) {
                for (let i = 0; i < searchIdString.length; i++) {
                    if (propietarioIdString[i] !== searchIdString[i]) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        });

        // Actualizar el estado de los eventos filtrados
        setPropietarios(filterPropietario);
    };


    const loadTable = () => {
        fetch("https://back-proyecto-segundo-cicnuenta.vercel.app/propietario/")
            .then((response) => response.json())
            .then((result) => {
                setPropietarios(result.data);
                setOriginalPropietario(result.data); // Guarda una copia de los eventos originales
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
                        setPropietarioSearch(value);
                    }
                }}
            />
            <ModalPropietario setFlag={setFlag} />
        </div>
    );


    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between ">
            <span className="text-xl text-900 font-bold">Propietarios</span>
        </div>
    );
    const footer = `En total hay ${propietarios ? propietarios.length : 0
        } Propietarios de mascotas.`;

    return (
        <Card title={search} style={{ margin: "15px" }}>
            <DataTable
                value={propietarios}
                header={header}
                footer={footer}
                tableStyle={{ minWidth: "60rem" }}
                sortField="id"
                sortOrder={1}
            >
                <Column field="id" header="id"></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="apellido" header="Apellido"></Column>
                <Column field="telefono" header="Teléfono"></Column>
                <Column
                    header="Mascotas"
                    body={(rowData) => (
                        <MascotasPropietario rowData={rowData} />
                    )}
                ></Column>
                <Column
                    header="Editar"
                    body={(rowData) => (
                        <EditarPropietario rowData={rowData} setFlag={setFlag} />
                    )}
                ></Column>
                <Column
                    header="Eliminar"
                    body={(rowData) => (
                        <EliminarPropietario rowData={`https://back-proyecto-segundo-cicnuenta.vercel.app/propietario/${rowData._id}`} setFlag={setFlag} />
                    )}
                ></Column>
            </DataTable>
        </Card>
    );


};

export default TablaPropietarios;