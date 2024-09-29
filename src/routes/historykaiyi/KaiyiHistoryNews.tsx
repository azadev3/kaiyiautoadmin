import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const KaiyiHistoryNews: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle children="EY KAIYI - Yeniliklər" msg="KAIYI səhifəsində yenilik (news) əlavə et, yenilə, sil." />
      <ShowComponent />
    </div>
  );
};

export default KaiyiHistoryNews;
