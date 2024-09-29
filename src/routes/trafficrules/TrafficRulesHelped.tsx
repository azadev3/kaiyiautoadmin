import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const TrafficRulesHelped: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Yol Qaydaları - İkinci aşağı bölmə"
        msg="Yol qaydaları səhifəsində yerləşən ikinci aşağı hissəni dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default TrafficRulesHelped;
