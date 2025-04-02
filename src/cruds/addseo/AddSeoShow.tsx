import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import ForHome from "./uitils/ForHome";
import ForStockInCars from "./uitils/ForStockInCars";
import ForPointSale from "./uitils/ForPointSale";
import ForTestDrive from "./uitils/ForTestDrive";
import ForCorporate from "./uitils/ForCorporate";
import ForKaiyiGarant from "./uitils/ForKaiyiGarant";
import ForRoadRules from "./uitils/ForRoadRules";
import ForRepair from "./uitils/ForRepair";
import ForMarkaKAiyi from "./uitils/ForMarkaKaiyi";
import ForBlog from "./uitils/ForBlog";
import ForNews from "./uitils/ForNews";
import ForContact from "./uitils/ForContact";

export interface Links {
    id: number;
    title: string;
    component?: React.JSX.Element
}

const LinkData: Links[] = [
    {
        id: 1,
        title: "Ana səhifə",
        component: <ForHome />
    },
    {
        id: 2,
        title: "Əldə olan maşınlar",
        component: <ForStockInCars />
    },
    {
        id: 3,
        title: "Satış nöqtəsi tap",
        component: <ForPointSale />
    },
    {
        id: 4,
        title: "Test sürüşü üçün qeydiyyat",
        component: <ForTestDrive />
    },
    {
        id: 5,
        title: "Korporativ müştərilər üçün",
        component: <ForCorporate />
    },
    {
        id: 6,
        title: "KAIYI qarantiya xidməti",
        component: <ForKaiyiGarant />
    },
    {
        id: 7,
        title: "Yol qaydaları",
        component: <ForRoadRules />
    },
    {
        id: 8,
        title: "Təmir və baxım",
        component: <ForRepair />
    },
    {
        id: 9,
        title: "Marka KAIYI",
        component: <ForMarkaKAiyi />
    },
    {
        id: 10,
        title: "Bloq",
        component: <ForBlog />
    },
    {
        id: 11,
        title: "Yeniliklər",
        component: <ForNews />
    },
    {
        id: 12,
        title: "Əlaqə",
        component: <ForContact />
    },
]

const AddSeoShow: React.FC = () => {

    const [accord, setAccord] = React.useState<{ [key: number]: boolean }>({});

    const handleAccord = (id: number) => {
        setAccord((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    return (
        <div className="shower">
            <div className="grid-links">
                {LinkData?.map((item: Links) => (
                    <div className="container-item">
                        <div
                            onClick={() => handleAccord(item?.id)}
                            className={`item-link ${accord[item.id] ? "active" : ""}`}
                            key={item?.id}>
                            <p>{item?.title}</p>
                            <FaChevronRight
                                style={{
                                    transform:
                                        accord[item.id] ? "rotate(90deg)" : ""
                                }}
                                className="right" />
                        </div>
                        {accord[item.id] && (
                            item.component
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddSeoShow;
