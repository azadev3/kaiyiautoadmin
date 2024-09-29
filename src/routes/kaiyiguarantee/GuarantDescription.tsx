import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const GuarantDescription: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Kaiyi AUTO Qarantiya - İkinci açıqlama hissəsi"
        msg="KAIYI Qarantiya səhifəsindəki ikinci alt açıqlama hissəni dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default GuarantDescription;
