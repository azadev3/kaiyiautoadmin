import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const Design: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Design"
        msg="Ana səhifədə yerləşən tablardakı Dizayn bölməsini dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default Design;
