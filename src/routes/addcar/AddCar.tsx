import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const AddCar: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle children="Maşınları əlavə et" msg="Ümumi olaraq modellərə aid olan istənilən növ maşınları buradan əlavə edin, dəyişdirin və ya silin." />
      <ShowComponent />
    </div>
  );
};

export default AddCar;
