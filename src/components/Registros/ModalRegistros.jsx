import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import { Calendar } from 'primereact/calendar';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ModalRegistros = ({ setFlag }) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState();
  const [fecha,setFecha]=useState(null)
  const [peso,setPeso]=useState("")
  const [temperatura,setTemperatura]=useState("")
  const [selectMascotas, setSelectMascotas] = useState("");
  const [selectServicios,setSelectServicios]=useState("")
  const [mascotas, setmascotas] = useState([]);
  const [servicios,setServicios]=useState([])

  const addRegistros = () => {
    const MySwal = withReactContent(Swal);

    const newRegistro = {
      id: id,
      fecha:fecha,
      peso:peso,
      temperatura:temperatura
    };

    fetch(
      `https://back-proyecto-segundo-cicnuenta.vercel.app/registro/${selectMascotas}/${selectServicios}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRegistro),
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


  const openDialog = () => {
    setVisible(true);
    fetchMascotas();
    fetchServicios();
  };

  const closeDialog = () => {
    setVisible(false);
  };
  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">Agregar Registro</span>
    </div>
  );

  const footerContent = (
    <div>
      <Button label="limpiar" icon="pi pi-eraser" severity="warning" />
      <Button
        label="Guardar"
        icon="pi pi-user-edit"
        severity="success"
        onClick={() => addRegistros()}
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
              <i className="pi pi-user"></i>
            </span>
            <InputText
              placeholder="Id"
              value={id}
              onChange={(e) => setId(parseInt(e.target.value) || "")}
            />
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

export default ModalRegistros;
