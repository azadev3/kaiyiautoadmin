import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const GuarantAttention: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Kaiyi AUTO Qarantiya - WARNING (ATTENTION) hissəsi"
        msg="KAIYI Qarantiya səhifəsindəki Üçüncü alt açıqlama hissəni dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default GuarantAttention;
