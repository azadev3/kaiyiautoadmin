import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const GuaranteHero: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Kaiyi AUTO Qarantiya - Hero hissə"
        msg="KAIYI Qarantiya səhifəsindəki hero hissəni dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default GuaranteHero;
