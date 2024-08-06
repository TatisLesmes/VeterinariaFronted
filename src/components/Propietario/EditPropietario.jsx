import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditarPropietario = ({ rowData, setFlag }) => {
    const [visible, setVisible] = useState(false);
    const [id, setID] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");

    useEffect(() => {
        if (rowData) {
            setID(rowData._id);
            setNombre(rowData.nombre);
            setApellido(rowData.apellido);
            setTelefono(rowData.telefono);
        }
    }, [rowData]);

    const updatePropietario = () => {
        const MySwal = withReactContent(Swal);
        const updateData = {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono
        };

        fetch(`https://back-proyecto-segundo-cicnuenta.vercel.app/propietario/${id}`, {
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
        setApellido("");
        setTelefono("");
    };

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            <span className="font-bold white-space-nowrap">Editar Propietario</span>
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
                onClick={() => updatePropietario()}
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
                {/**Form */}
                <div className="card flex flex-column md:flex-row gap-3">
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">_ID</span>
                        <InputText placeholder="ID" value={id} disabled />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon"><i className="pi pi-user"></i></span>
                        <InputText placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon"><i className="pi pi-user"></i></span>
                        <InputText placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon"><i className="pi pi-phone"></i></span>
                        <InputText placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                </div>
                {/**End Form */}
            </Dialog>
        </div>
    );
};

export default EditarPropietario;
