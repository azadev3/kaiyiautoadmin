import React from "react";
import ShowComponent from "../../uitils/ShowComponent";
import MainTitle from "../../uitils/MainTitle";

const OurAdvantages: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Üstünlüklərimiz"
        msg="Korporativ Müştərilər Üçün daxilindəki Üstünlüklərimiz əlavə edin, dəyişdirin, silin."
      />
      <ShowComponent />
    </div>
  );
};

export default OurAdvantages;
