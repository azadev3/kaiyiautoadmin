import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const Models: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Models"
        msg="Ana səhifədə yerləşən tablardakı Modellər bölməsini dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default Models;
