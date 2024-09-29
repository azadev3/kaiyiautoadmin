import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const KaiyiHistoryBlogs: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle children="EY KAIYI - Bloqlar" msg="KAIYI səhifəsində bloq əlavə et, yenilə, sil." />
      <ShowComponent />
    </div>
  );
};

export default KaiyiHistoryBlogs;
