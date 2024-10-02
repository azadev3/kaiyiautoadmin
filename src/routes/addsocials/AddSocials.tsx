import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const AddSocials: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle children="Sosial media əlavə et" msg="Sosial media ikonlar əlavə et, sil, dəyişdir." />
      <ShowComponent />
    </div>
  );
};

export default AddSocials;
