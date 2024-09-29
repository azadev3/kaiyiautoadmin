import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const ModelVideoTab: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle children="Video hissəsi" msg="Modelin daxilindəki Video tab hissəyə düzəlişlər" />
      <ShowComponent />
    </div>
  );
};

export default ModelVideoTab;
