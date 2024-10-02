import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { endpoint } from "../../Baseurl";
import Loader from "../../Loader";
import { useRecoilState } from "recoil";
import { isTableModalState } from "../../recoil/atoms";
import { FaInfo } from "react-icons/fa6";
import { LuEye } from "react-icons/lu";
import { RiCloseFill } from "react-icons/ri";
import { MdSignalWifiStatusbar3Bar, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import StatusToggle from "../../uitils/StatusToggle";
import { Link } from "react-router-dom";

export type DataTypeSocial = {
  _id: string;
  title: {
    az: string;
    en: string;
    ru: string;
  };
  link: string;
  icon: string;
  status?: string;
};

const AddSocialShow: React.FC = () => {
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeSocial[]>({
    queryKey: ["fetchDataKeySocials"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/add-socials`, {
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
    fetchData?.find((data: DataTypeSocial) => {
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
      const response = await axios.post(`${endpoint}/status-update-add-socials/${id}`, {
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
              <th>Başlıq (AZ)</th>
              <th>Başlıq (EN)</th>
              <th>Başlıq (RU)</th>
              <th>Link</th>
              <th>Digər</th>
            </tr>
          </thead>

          <tbody>
            {hasData
              ? fetchData?.map((data: DataTypeSocial) => (
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
                          api="/status-add-socials"
                        />
                      </div>
                    </td>
                    <td>{data?._id}</td>
                    <td>{data?.title?.az}</td>
                    <td>{data?.title?.en}</td>
                    <td>{data?.title?.ru}</td>
                    <td>
                      <Link to={data?.link || ""} target="_blank">
                        {data?.link}
                      </Link>
                    </td>
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
                  <th>Başlıq (AZ)</th>
                  <th>Başlıq (EN)</th>
                  <th>Başlıq (RU)</th>
                  <th>Link</th>
                </tr>
              </thead>

              <tbody>
                {hasData && isTableModal ? (
                  <tr>
                    <td title={isTableModal?._id}>{isTableModal?._id}</td>
                    <td title={isTableModal?.title?.az}>{isTableModal?.title?.az}</td>
                    <td title={isTableModal?.title?.en}>{isTableModal?.title?.en}</td>
                    <td title={isTableModal?.title?.ru}>{isTableModal?.title?.ru}</td>
                    <td>
                      <Link to={isTableModal?.link || ""} target="_blank">
                        {isTableModal?.link}
                      </Link>
                    </td>
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

export default AddSocialShow;
