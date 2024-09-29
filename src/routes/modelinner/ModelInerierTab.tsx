import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const ModelInerierTab: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle children="İnteryer hissəsi" msg="Modelin daxilindəki İnteryer tab hissəyə düzəlişlər" />
      <ShowComponent />
    </div>
  );
};

export default ModelInerierTab;
