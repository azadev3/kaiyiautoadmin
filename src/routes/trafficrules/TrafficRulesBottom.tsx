import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const TrafficRulesBottom: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Yol Qaydaları - Aşağı üçüncü hissə"
        msg="Yol qaydaları səhifəsində yerləşən ən aşağı hissəni dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default TrafficRulesBottom;
