import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const ModelPdf: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="İstifadəçi təlimatları"
        msg="Modelin daxilindəki İstifadəçi təlimatları hissəsinə pdf, doc, docx əlavə edin."
      />
      <ShowComponent />
    </div>
  );
};

export default ModelPdf;
