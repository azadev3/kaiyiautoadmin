import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const AddDealer: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle children="Diler əlavə et" msg="Satış Nöqtəsi Tap hissəsində form üçün Diler əlavə et, sil, dəyişdir." />
      <ShowComponent />
    </div>
  );
};

export default AddDealer;
