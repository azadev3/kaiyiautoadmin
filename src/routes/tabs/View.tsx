import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const View: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="View"
        msg="Ana səhifədə yerləşən tablardakı Baxış bölməsini dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default View;
