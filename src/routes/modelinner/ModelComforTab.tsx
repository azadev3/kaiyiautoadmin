import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const ModelComforTab: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle children="Komfort hissəsi" msg="Modelin daxilindəki Komfort tab hissəyə düzəlişlər" />
      <ShowComponent />
    </div>
  );
};

export default ModelComforTab;
