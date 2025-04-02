import React from "react";
import ShowComponent from "../../uitils/ShowComponent";
import MainTitle from "../../uitils/MainTitle";

const AddSeo: React.FC = () => {
    return (
        <div className="route-component">
            <MainTitle
                children="SEO Əlavələri"
                msg="Sayt üçün ilkin seo əlavələri yaradın"
            />
            <ShowComponent />
        </div>
    );
};

export default AddSeo;
