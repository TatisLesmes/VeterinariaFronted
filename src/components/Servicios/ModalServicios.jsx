import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalServicios = ({ setFlag }) => {
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [costo, setCosto] = useState("");
    // const [servicios, setServicios] = useState([]);

    const addServicios = () => {
        const MySwal = withReactContent(Swal);

        const newServicio = {
            id: parseInt(id) || 0, // Asegúrate de que `id` sea un número
            nombre: nombre,
            descripcion: descripcion,
            costo: parseFloat(costo) || 0 // Asegúrate de que `costo` sea un número
        };

        fetch(
            `https://back-proyecto-segundo-cicnuenta.vercel.app/servicio`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newServicio),
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
            <span className="font-bold white-space-nowrap">Agregar Servicio</span>
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
                    setNombre("");
                    setDescripcion("");
                    setCosto("");
                }}
            />
            <Button
                label="Guardar"
                icon="pi pi-save"
                severity="success"
                onClick={() => addServicios()}
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
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-info-circle"></i>
                        </span>
                        <Dropdown
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.value)}
                            options={[
                                { label: 'Básico', value: 'basico' },
                                { label: 'Premium', value: 'premium' }
                            ]}
                            placeholder="Selecciona el tipo"
                            className="w-full md:w-14rem"
                        />
                    </div>
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-dollar"></i>
                        </span>
                        <InputText
                            placeholder="Costo"
                            value={costo}
                            onChange={(e) => setCosto(e.target.value)}
                            type="number"
                            mode="currency"
                            currency="USD"
                        />
                    </div>
                </div>
                {/**End Form */}
            </Dialog>
        </div>
    );
};

export default ModalServicios;
