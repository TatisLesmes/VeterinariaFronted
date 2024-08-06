import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from 'primereact/calendar';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const EditRegistros = ({ rowData, setFlag }) => {
  const [visible, setVisible] = useState(false);
  const [id, setID] = useState("");
  const [fecha, setFecha] = useState(null);
  const [peso, setPeso] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [selectMascotas, setSelectMascotas] = useState("");
  const [selectServicios, setSelectServicios] = useState("");
  const [mascotas, setmascotas] = useState([]);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    setID(rowData._id);
    setFecha(rowData.fecha);
    setPeso(rowData.peso);
    setTemperatura(rowData.temperatura);
  }, [rowData]);

  const updateRegistro = () => {
    const MySwal = withReactContent(Swal);
    const updateRegistro = {
      fecha: fecha,
      peso: peso,
      temperatura: temperatura,
      idMascota: selectMascotas,
      idServicio: selectServicios,
    };

    fetch(`https://back-proyecto-segundo-cicnuenta.vercel.app/registro/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateRegistro),
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
    setFecha(null);
    setPeso("");
    setTemperatura("");
  };
  const fetchMascotas = async () => {
    try {
      const response = await fetch(
        "https://back-proyecto-segundo-cicnuenta.vercel.app/mascota"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch mascotas");
      }
      const data = await response.json();
      setmascotas(data.data);
    } catch (error) {
      console.error("Error fetchin mascotas:", error);
    }
  };
  const fetchServicios = async () => {
    try {
      const response = await fetch(
        "https://back-proyecto-segundo-cicnuenta.vercel.app/servicio"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch servicios");
      }
      const data = await response.json();
      setServicios(data.data);
    } catch (error) {
      console.error("Error fetchin servicios:", error);
    }
  };
  fetchMascotas();
  fetchServicios();

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Editar Mascotas</span>
    </div>
  );

  const footerContent = (
    <div>
      <Button
        label="limpiar"
        icon="pi pi-eraser"
        severity="warning"
        onClick={() => cleanFields()}
      />
      <Button
        label="aceptar"
        icon="pi pi-user-edit"
        severity="success"
        onClick={() => updateRegistro()}
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
            <span className="p-inputgroup-addon">
              <i className="pi pi-calendar"></i>
            </span>
            <Calendar value={fecha} onChange={(e) => setFecha(e.value)} inline showWeek />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-gauge"></i>
            </span>
            <InputText
              placeholder="Peso"
              value={peso}
              onChange={(e) => setPeso(parseInt(e.target.value) || "")}
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-sun"></i>
            </span>
            <InputText
              placeholder="Temperatura"
              value={temperatura}
              onChange={(e) => setTemperatura(parseInt(e.target.value) || "")}
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">Mascota</span>
            <Dropdown
              value={selectMascotas}
              onChange={(e) => setSelectMascotas(e.value)}
              options={mascotas}
              optionLabel="nombre"
              optionValue="_id"
              placeholder="Selecciona una mascota"
              className="w-full md:w-14rem"
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">Servicio</span>
            <Dropdown
              value={selectServicios}
              onChange={(e) => setSelectServicios(e.value)}
              options={servicios}
              optionLabel="nombre"
              optionValue="_id"
              placeholder="Selecciona un servicio"
              className="w-full md:w-14rem"
            />
          </div>
        </div>
        {/**End Form */}
      </Dialog>
    </div>
  );
};

export default EditRegistros;
