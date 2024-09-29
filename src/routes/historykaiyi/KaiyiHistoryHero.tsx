import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const KaiyiHistoryHero: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="EY KAIYI - Hero hissəsi"
        msg="KAIYI səhifəsində hero hissəni dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default KaiyiHistoryHero;
