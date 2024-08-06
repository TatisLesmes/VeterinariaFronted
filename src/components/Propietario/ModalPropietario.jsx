import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalPropietario = ({ setFlag }) => {
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");

    const addPropietario = () => {
        const MySwal = withReactContent(Swal);

        const newPropietario = {
            id: parseInt(id) || 0, // Asegúrate de que `id` sea un número
            nombre: name,
            apellido: apellido,
            telefono: parseInt(telefono) || 0 // Asegúrate de que `telefono` sea un número
        };

        fetch(
            `https://back-proyecto-segundo-cicnuenta.vercel.app/propietario`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPropietario),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setVisible(false);
                if (data.state) {
                    MySwal.fire({
                        title: <p>Agregado</p>,
                        icon: "success",
                    });
                    setFlag(true);
                } else {
                    MySwal.fire({
                        title: <p>{data.error}</p>,
                        icon: "error",
                    });
                }
            })
            .catch((error) => {
                setVisible(false);
                MySwal.fire({
                    title: <p>{error.message}</p>,
                    icon: "error",
                });
            });
    };

    const openDialog = () => {
        setVisible(true);
    };

    const closeDialog = () => {
        setVisible(false);
    };

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Agregar Propietario</span>
        </div>
    );

    const footerContent = (
        <div>
            <Button
                label="Limpiar"
                icon="pi pi-eraser"
                severity="warning"
                onClick={() => {
                    setId("");
                    setName("");
                    setApellido("");
                    setTelefono("");
                }}
            />
            <Button
                label="Guardar"
                icon="pi pi-save"
                severity="success"
                onClick={() => addPropietario()}
            />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Button icon="pi pi-save" onClick={() => openDialog()} />
            <Dialog
                visible={visible}
                modal
                header={headerElement}
                footer={footerContent}
                style={{ width: "50rem" }}
                onHide={() => closeDialog()}
            >
                {/**Form */}
                <div className="card flex flex-column md:flex-row gap-3">
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-id-card"></i>
                        </span>
                        <InputText
                            placeholder="ID"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            type="number"
                        />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText
                            placeholder="Apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-phone"></i>
                        </span>
                        <InputText
                            placeholder="Teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            type="number"
                        />
                    </div>
                </div>
                {/**End Form */}
            </Dialog>
        </div>
    );
};

export default ModalPropietario;
