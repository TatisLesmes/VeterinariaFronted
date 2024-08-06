import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditServicios = ({ rowData, setFlag }) => {
    const [visible, setVisible] = useState(false);
    const [id, setID] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [costo, setCosto] = useState(0);

    const tiposServicio = [
        { label: 'Básico', value: 'basico' },
        { label: 'Premium', value: 'premium' }
    ];

    useEffect(() => {
        if (rowData) {
            setID(rowData._id);
            setNombre(rowData.nombre);
            setDescripcion(rowData.descripcion);
            setCosto(rowData.costo);
        }
    }, [rowData]);

    const updateServicio = () => {
        const MySwal = withReactContent(Swal);
        const updateData = {
            nombre: nombre,
            descripcion: descripcion,
            costo: costo
        };

        fetch(`https://back-proyecto-segundo-cicnuenta.vercel.app/servicio/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        })
            .then((response) => response.json())
            .then((data) => {
                setVisible(false);
                if (data.state) {
                    MySwal.fire({
                        title: <p>Editado</p>,
                        icon: "success",
                    });
                } else {
                    MySwal.fire({
                        title: <p>{data.error}</p>,
                        icon: "error",
                    });
                }
                setFlag(true);
            })
            .catch((error) => {
                console.log(error);
                setVisible(false);
                MySwal.fire({
                    title: <p>{error.message}</p>,
                    icon: "error",
                });
            });
    };

    const cleanFields = () => {
        setNombre("");
        setDescripcion("");
        setCosto(0);
    };

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Editar Servicio</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button
                label="Limpiar"
                icon="pi pi-eraser"
                severity="warning"
                onClick={() => cleanFields()}
            />
            <Button
                label="Aceptar"
                icon="pi pi-user-edit"
                severity="success"
                onClick={() => updateServicio()}
            />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Button
                label="Editar"
                icon="pi pi-pencil"
                severity="warning"
                onClick={() => setVisible(true)}
            />
            <Dialog
                visible={visible}
                modal
                header={headerElement}
                footer={footerContent}
                style={{ width: "50rem" }}
                onHide={() => setVisible(false)}
            >
                <div className="card flex flex-column md:flex-row gap-3">
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">ID</span>
                        <InputText placeholder="ID" value={id} disabled />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon"><i className="pi pi-user"></i></span>
                        <InputText placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon"><i className="pi pi-info-circle"></i></span>
                        <Dropdown
                            value={descripcion}
                            options={tiposServicio}
                            onChange={(e) => setDescripcion(e.value)}
                            placeholder="Selecciona el tipo"
                        />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon"><i className="pi pi-dollar"></i></span>
                        <InputText
                            placeholder="Costo"
                            value={costo}
                            onChange={(e) => setCosto(e.target.value)}
                            type="number"
                            min="0"
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default EditServicios;
