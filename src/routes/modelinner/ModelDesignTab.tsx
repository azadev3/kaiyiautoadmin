import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const ModelDesignTab: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle children="Dizayn hissəsi" msg="Modelin daxilindəki Dizayn tab hissəyə düzəlişlər" />
      <ShowComponent />
    </div>
  );
};

export default ModelDesignTab;
