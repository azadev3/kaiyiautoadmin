import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const RepairRulesDownload: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Repair - Baxım qaydalarını yükləyin"
        msg="Təmir və Baxım səhifəsində yerləşən Baxım Qaydalarını PDF formasında yükləyin, düzəliş edin, silin."
      />
      <ShowComponent />
    </div>
  );
};

export default RepairRulesDownload;
