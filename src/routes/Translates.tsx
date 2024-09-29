import React from "react";
import MainTitle from "../uitils/MainTitle";
import ShowComponent from "../uitils/ShowComponent";

const Translates: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle children="Tərcümələr" msg="Saytdakı Tərcümələr - dəyişdir, sil və ya yenilə." />
      <ShowComponent />
    </div>
  );
};

export default Translates;
