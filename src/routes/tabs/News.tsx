import React from "react";
import MainTitle from "../../uitils/MainTitle";
import ShowComponent from "../../uitils/ShowComponent";

const News: React.FC = () => {
  return (
    <div className="route-component">
      <MainTitle
        children="News"
        msg="Ana səhifədə yerləşən tablardakı Xəbərlər bölməsini dəyişdir, sil və ya yenilə."
      />
      <ShowComponent />
    </div>
  );
};

export default News;
