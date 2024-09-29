import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const Interier: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Interier"
        msg="Ana səhifədə yerləşən tablardakı Interier bölməsini dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default Interier;
