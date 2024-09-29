import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const Comfortable: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Comfortable"
        msg="Ana səhifədə yerləşən tablardakı Rahatlıq bölməsini dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default Comfortable;
