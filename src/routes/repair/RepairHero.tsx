import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const RepairHero: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Repair - Hero"
        msg="Ana səhifədə yerləşən tablardakı təmir və baxım bölməsini dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default RepairHero;
