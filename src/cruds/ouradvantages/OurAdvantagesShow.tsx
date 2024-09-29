import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { endpoint } from "../../Baseurl";
import Loader from "../../Loader";
import { useRecoilState } from "recoil";
import { isTableModalState } from "../../recoil/atoms";
import { LuEye } from "react-icons/lu";
import { FaInfo } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import { MdSignalWifiStatusbar3Bar, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import StatusToggle from "../../uitils/StatusToggle";

export type OurAdvantagesType = {
  _id: string;
  navTitle: {
    az: string;
    en: string;
    ru: string;
  };
  content: [
    {
      description: {
        az: string;
        en: string;
        ru: string;
      };
      title: {
        az: string;
        en: string;
        ru: string;
      };
      icon: string;
    }
  ];
  status?: string;
};

const OurAdvantagesShow: React.FC = () => {
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<OurAdvantagesType[]>({
    queryKey: ["fetchDataKeyOurAdvantages"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/ouradvantages`);
      console.log(response.data, 'status for response data ')
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
    fetchData?.find((data: OurAdvantagesType) => {
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
      const response = await axios.post(`${endpoint}/status-update-ouradvantages/${id}`, {
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
              <th>Nav Başlıq (AZ)</th>
              <th>Nav Başlıq (EN)</th>
              <th>Nav Başlıq (RU)</th>
              <th>Kontent:</th>
              <th>Digər</th>
            </tr>
          </thead>

          <tbody>
            {hasData
              ? fetchData?.map((data: OurAdvantagesType) => (
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
                          api="/status-ouradvantages"
                        />
                      </div>
                    </td>
                    <td>{data?._id}</td>
                    <td>{data?.navTitle?.az}</td>
                    <td>{data?.navTitle?.en}</td>
                    <td>{data?.navTitle?.ru}</td>

                    <td>
                      {data?.content && Array.isArray(data.content) && data.content.length > 0
                        ? "Əlavə edilib"
                        : "Əlavə olunmayıb"}
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
                  <th>Nav Başlıq (AZ)</th>
                  <th>Nav Başlıq (EN)</th>
                  <th>Nav Başlıq (RU)</th>
                  <th>Kontent</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {hasData && isTableModal ? (
                  <tr>
                    <td title={isTableModal?._id}>{isTableModal?._id}</td>
                    <td title={isTableModal?.navTitle?.az}>{isTableModal?.navTitle?.az}</td>
                    <td title={isTableModal?.navTitle?.en}>{isTableModal?.navTitle?.en}</td>
                    <td title={isTableModal?.navTitle?.ru}>{isTableModal?.navTitle?.ru}</td>
                    <td>
                      {isTableModal?.content && Array.isArray(isTableModal.content) && isTableModal.content.length > 0
                        ? "Əlavə edilib"
                        : "Əlavə olunmayıb"}
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

export default OurAdvantagesShow;
