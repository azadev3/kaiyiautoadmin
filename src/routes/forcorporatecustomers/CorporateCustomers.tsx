import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";
const CorporateCustomers: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Korporativ Müştərilər Üçün"
        msg="Korporativ Müştərilər Üçün hissəsini dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default CorporateCustomers;
