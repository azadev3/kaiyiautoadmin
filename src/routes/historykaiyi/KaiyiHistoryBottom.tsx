import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const KaiyiHistoryBottom: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="EY KAIYI - Aşağı hissələr"
        msg="KAIYI səhifəsində aşağı hissələri dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default KaiyiHistoryBottom;
