import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { endpoint } from "../../Baseurl";
import Loader from "../../Loader";
import { useRecoilState } from "recoil";
import { isTableModalState } from "../../recoil/atoms";
import { RiCloseFill } from "react-icons/ri";
import { FaInfo } from "react-icons/fa6";
import { LuEye } from "react-icons/lu";
import { MdSignalWifiStatusbar3Bar, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import StatusToggle from "../../uitils/StatusToggle";

export type Descriptions = {
  id: string;
  descTitle: {
    az: string;
    en: string;
    ru: string;
  };
  icon: string;
};

export interface DataTypeCar {
  _id: string;
  title: {
    az: string;
    en: string;
    ru: string;
  };
  year: string;
  vin: string;
  inStock: {
    az: string;
    en: string;
    ru: string;
  };
  price: string;
  companyTitle: {
    az: string;
    en: string;
    ru: string;
  };
  carImage: string;
  miniDesc: {
    az: string;
    en: string;
    ru: string;
  };
  selected_model: string;
  status: string;
}

const AddCarShow: React.FC = () => {
  //for selected model inner contents
  const { data: datas } = useQuery<any>({
    queryKey: ["fetchDataModelsAll", "az"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/modelstabfront`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "az",
        },
      });
      return response.data;
    },
  });
  const hasDataModels = datas && datas?.length > 0;

  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeCar[]>({
    queryKey: ["fetchDataKeyAddCar"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/add-car`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    },
    staleTime: 3000000,
  });

  //this function open the table more modal
  const [tableModal, setTableModal] = useRecoilState(isTableModalState);
  const handleShowTableModal = (id: string) => {
    setTableModal(id);
  };
  const hasData = fetchData && fetchData?.length > 0;
  const isTableModal =
    hasData &&
    fetchData?.find((data: DataTypeCar) => {
      return tableModal === data?._id;
    });

  //outside click close modal
  const modalRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      if (modalRef?.current && !modalRef?.current?.contains(e.target as Node)) {
        setTableModal("");
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    return () => document.removeEventListener("mousedown", outsideClicked);
  }, []);

  //update status
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await axios.post(`${endpoint}/status-update-add-car/${id}`, {
        status: newStatus,
      });
      const timeout = setTimeout(() => {
        refetch();
      }, 100);

      console.log("Status updated:", response.data);
      return () => clearTimeout(timeout);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="shower">
      {/* TABLE PREVIEW */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>ID</th>
              <th>Aid Olduğu Model</th>
              <th>Başlıq (AZ)</th>
              <th>Başlıq (EN)</th>
              <th>Başlıq (RU)</th>
              <th>İl</th>
              <th>VİN</th>
              <th>Stok vəziyyəti (AZ)</th>
              <th>Stok vəziyyəti (EN)</th>
              <th>Stok vəziyyəti (RU)</th>
              <th>Qiymət</th>
              <th>Mini Açıqlama (AZ)</th>
              <th>Mini Açıqlama (EN)</th>
              <th>Mini Açıqlama (RU)</th>
              <th>Company Title (AZ)</th>
              <th>Company Title (EN)</th>
              <th>Company Title (RU)</th>
              <th>Digər</th>
            </tr>
          </thead>

          <tbody>
            {hasData
              ? fetchData?.map((data: DataTypeCar) => (
                  <tr key={data?._id}>
                    <td>
                      <div className={`status-btn ${data?.status === "active" ? "actived" : ""}`}>
                        {data?.status === "active" ? (
                          <MdSignalWifiStatusbar3Bar className="editicon" />
                        ) : (
                          <MdSignalWifiStatusbarNotConnected className="editicon" />
                        )}
                        <span>{data?.status}</span>
                        <StatusToggle
                          id={data?._id}
                          isChange={(newStatus) => updateStatus(data?._id, newStatus)}
                          api="/status-add-car"
                        />
                      </div>
                    </td>
                    <td>{data?._id}</td>
                    {hasDataModels && datas?.find((item: any) => item?._id === data?.selected_model) ? (
                      <td title={datas?.selected_model}>
                        {datas?.find((item: any) => item?._id === data?.selected_model)?.title || ""}
                      </td>
                    ) : (
                      <td>Model tapılmadı</td>
                    )}
                    <td>{data?.title?.az}</td>
                    <td>{data?.title?.en}</td>
                    <td>{data?.title?.ru}</td>
                    <td>{data?.year}</td>
                    <td>{data?.vin}</td>
                    <td>{data?.inStock?.az}</td>
                    <td>{data?.inStock?.en}</td>
                    <td>{data?.inStock?.ru}</td>
                    <td>{data?.price}</td>
                    <td>{data?.miniDesc?.az}</td>
                    <td>{data?.miniDesc?.en}</td>
                    <td>{data?.miniDesc?.ru}</td>
                    <td>{data?.companyTitle?.az}</td>
                    <td>{data?.companyTitle?.en}</td>
                    <td>{data?.companyTitle?.ru}</td>
                    <td>
                      <button className="showmorebtn" onClick={() => handleShowTableModal(data?._id)}>
                        <span>Tam Göstər</span>
                        <LuEye className="eye-icon" />
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
      {/* TABLE MODAL */}
      <div className={`table-modal-for-show-data-overlay ${isTableModal ? "active" : ""}`}>
        <div ref={modalRef} className="data-content">
          <RiCloseFill className="close" onClick={() => setTableModal("")} />
          <div className="info-area">
            <FaInfo className="info-icon" />
            <p>Digər əməliyyatlar üçün (delete, update, create) "Parametrlər" bölməsinə baxın.</p>
          </div>
          <section className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Aid Olduğu Model</th>
                  <th>Başlıq (AZ)</th>
                  <th>Başlıq (EN)</th>
                  <th>Başlıq (RU)</th>
                  <th>İl</th>
                  <th>VİN</th>
                  <th>Stok vəziyyəti (AZ)</th>
                  <th>Stok vəziyyəti (EN)</th>
                  <th>Stok vəziyyəti (RU)</th>
                  <th>Qiymət</th>
                  <th>Mini Açıqlama (AZ)</th>
                  <th>Mini Açıqlama (EN)</th>
                  <th>Mini Açıqlama (RU)</th>
                  <th>Company Title (AZ)</th>
                  <th>Company Title (EN)</th>
                  <th>Company Title (RU)</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {hasData && isTableModal ? (
                  <tr>
                    <td title={isTableModal?._id}>{isTableModal?._id}</td>
                    {hasDataModels && datas?.find((item: any) => item?._id === isTableModal?.selected_model) ? (
                      <td title={isTableModal?.selected_model}>
                        {datas?.find((item: any) => item?._id === isTableModal?.selected_model)?.title || ""}
                      </td>
                    ) : (
                      <td>Model tapılmadı</td>
                    )}
                    <td title={isTableModal?.title?.az}>{isTableModal?.title?.az}</td>
                    <td title={isTableModal?.title?.en}>{isTableModal?.title?.en}</td>
                    <td title={isTableModal?.title?.ru}>{isTableModal?.title?.ru}</td>
                    <td title={isTableModal?.year}>{isTableModal?.year}</td>
                    <td title={isTableModal?.vin}>{isTableModal?.vin}</td>
                    <td title={isTableModal?.inStock?.az}>{isTableModal?.inStock?.az}</td>
                    <td title={isTableModal?.inStock?.en}>{isTableModal?.inStock?.en}</td>
                    <td title={isTableModal?.inStock?.ru}>{isTableModal?.inStock?.ru}</td>
                    <td title={isTableModal?.price}>{isTableModal?.price}</td>
                    <td title={isTableModal?.miniDesc?.az}>{isTableModal?.miniDesc?.az}</td>
                    <td title={isTableModal?.miniDesc?.en}>{isTableModal?.miniDesc?.en}</td>
                    <td title={isTableModal?.miniDesc?.ru}>{isTableModal?.miniDesc?.ru}</td>
                    <td title={isTableModal?.companyTitle?.az}>{isTableModal?.companyTitle?.az}</td>
                    <td title={isTableModal?.companyTitle?.en}>{isTableModal?.companyTitle?.en}</td>
                    <td title={isTableModal?.companyTitle?.ru}>{isTableModal?.companyTitle?.ru}</td>
                    <td title={isTableModal?.status}>
                      <div className={`status-btn ${isTableModal?.status === "active" ? "actived" : ""}`}>
                        {isTableModal?.status === "active" ? (
                          <MdSignalWifiStatusbar3Bar className="editicon" />
                        ) : (
                          <MdSignalWifiStatusbarNotConnected className="editicon" />
                        )}
                        <span>{isTableModal?.status}</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddCarShow;
