import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const MascotasPropietario = ({ rowData }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="card flex justify-content-center">
            <Button
                label="Mascotas"
                icon="pi pi-users"
                severity="info"
                onClick={() => setVisible(true)}
            />
            <Dialog
                header="Mascotas del Propietario"
                visible={visible}
                style={{ width: "50vw" }}
                onHide={() => setVisible(false)}
            >
                <div className="card">
                    {rowData.mascotas && rowData.mascotas.length > 0 ? (
                        rowData.mascotas.map((mascota, index) => (
                            <div key={index}>
                                <div>Nombre: {mascota.nombre}</div>
                                <div>Tipo: {mascota.tipo}</div>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <div>El propietario no tiene mascotas registradas.</div>
                    )}
                </div>
            </Dialog>
        </div>
    );
};

export default MascotasPropietario;
