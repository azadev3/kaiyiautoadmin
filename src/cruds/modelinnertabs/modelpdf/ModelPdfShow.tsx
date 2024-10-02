import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil";
import { LuEye } from "react-icons/lu";
import { FaInfo } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import { MdSignalWifiStatusbar3Bar, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import { endpoint } from "../../../Baseurl";
import { isTableModalState } from "../../../recoil/atoms";
import Loader from "../../../Loader";
import StatusToggle from "../../../uitils/StatusToggle";
import { Link } from "react-router-dom";

export type DataTypeModelPdf = {
  _id: string;
  pdf: string;
  selected_model: string;
  status?: string;
};

const ModelPdfShow: React.FC = () => {
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
  } = useQuery<DataTypeModelPdf[]>({
    queryKey: ["fetchDataModelPdf"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/modelpdf`, {
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
    fetchData?.find((data: DataTypeModelPdf) => {
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
      const response = await axios.post(`${endpoint}/status-update-modelpdf/${id}`, {
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
              <th>Fayl</th>
              <th>Modeldədir:</th>
              <th>Digər</th>
            </tr>
          </thead>

          <tbody>
            {hasData
              ? fetchData?.map((data: DataTypeModelPdf) => (
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
                          api="/status-modelpdf"
                        />
                      </div>
                    </td>
                    <td>{data?._id}</td>
                    <td>
                      <Link target="_blank" to={`http://localhost:3000${data?.pdf}`}>
                        {data?.pdf}
                      </Link>
                    </td>
                    {hasDataModels && datas?.find((item: any) => item?._id === data?.selected_model) ? (
                      <td title={datas?.selected_model}>
                        {datas?.find((item: any) => item?._id === data?.selected_model)?.title || ""}
                      </td>
                    ) : (
                      <td>Model tapılmadı</td>
                    )}
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
                  <th>Fayl</th>
                  <th>Modeldədir:</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {hasData && isTableModal ? (
                  <tr>
                    <td title={isTableModal?._id}>{isTableModal?._id}</td>
                    <td title={isTableModal?.pdf}>
                      <Link target="_blank" to={`http://localhost:3000${isTableModal?.pdf}`}>
                        {isTableModal?.pdf}
                      </Link>
                    </td>
                    {hasDataModels && datas?.find((item: any) => item?._id === isTableModal?.selected_model) ? (
                      <td title={isTableModal?.selected_model}>
                        {datas?.find((item: any) => item?._id === isTableModal?.selected_model)?.title || ""}
                      </td>
                    ) : (
                      <td>Model tapılmadı</td>
                    )}
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

export default ModelPdfShow;
