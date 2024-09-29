import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const KaiyiContactHero: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="Əlaqə - Hero"
        msg="Əlaqə səhifəsində HERO hissəni əlavə et, dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default KaiyiContactHero;
