import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const AddCity: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle children="Şəhər əlavə et" msg="Satış Nöqtəsi Tap hissəsində xəritə üçün lokasyonlar əlavə et, sil, dəyişdir." />
      <ShowComponent />
    </div>
  );
};

export default AddCity;
