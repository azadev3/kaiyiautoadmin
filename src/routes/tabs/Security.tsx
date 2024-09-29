import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const Security: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Security"
        msg="Ana səhifədə yerləşən tablardakı Təhlükəsizlik bölməsini dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default Security;
