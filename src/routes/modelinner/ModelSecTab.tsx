import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const ModelSecTab: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle children="Təhlükəsizlik hissəsi" msg="Modelin daxilindəki Təhlükəsizlik tab hissəyə düzəlişlər" />
      <ShowComponent />
    </div>
  );
};

export default ModelSecTab;
