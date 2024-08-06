import React from "react";
import NavBar from "../components/NavBar";
import backgroundImage from "../assets/download.png";
import { Card } from "primereact/card";

const Home = () => {
  const header = (
    <img
      alt="Card"
      src={backgroundImage}
      onError={(e) =>
        (e.target.src =
          "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
      }
      style={{ width: "90%", height: "400px", objectFit: "cover" }}
    />
  );
  return (
    <>
      <NavBar />
      <div className="p-d-flex p-jc-center p-ai-center p-mt-5">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            header={header}
            className="p-mb-3"
            style={{ width: "80%", marginTop: "20px", textAlign: "center" }}
          >
            <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
              <h1>PETHEALTH</h1>
              <p>
                Bienvenido a nuestro sistema de gestión de mascotas, propietarios, historial, y servicios de la veterinaria PetHealth.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Home;