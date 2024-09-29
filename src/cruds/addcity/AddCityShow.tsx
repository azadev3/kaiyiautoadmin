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
import { Link } from "react-router-dom";

type InformationMore = {
  _id: string;
  title: {
    az: string;
    en: string;
    ru: string;
  };
  value: {
    az: string;
    en: string;
    ru: string;
  };
};
type otherServices = {
  _id: string;
  serviceIcon: string;
  serviceName: {
    az: string;
    en: string;
    ru: string;
  };
};

type City = {
  _id: string;
  name: {
    az: string;
    en: string;
    ru: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  informations?: InformationMore[];
  otherServices?: otherServices[];
  websiteLink?: string;
  status: string;
};

export interface DataTypeCityLocations {
  _id: string;
  city: City[];
  status: string;
}

export type DataTypeCity = {
  _id: string;
  cityName: {
    az: string;
    en: string;
    ru: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  informations: InformationMore[];
  otherServices: otherServices[];
  websiteLink: string;
  status: string;
};

const AddCityShow: React.FC = () => {
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeCity[]>({
    queryKey: ["fetchDataKeyCities"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/city`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data?.cities;
    },
  });

  //this function open the table more modal
  const [tableModal, setTableModal] = useRecoilState(isTableModalState);
  const handleShowTableModal = (id: string) => {
    setTableModal(id);
  };
  const hasData = fetchData && fetchData?.length > 0;
  const isTableModal =
    hasData &&
    fetchData?.find((data: DataTypeCity) => {
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
      const response = await axios.post(`${endpoint}/status-update-city/${id}`, {
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
              <th>Şəhər adı (AZ)</th>
              <th>Şəhər adı (EN)</th>
              <th>Şəhər adı (RU)</th>
              <th>LAT</th>
              <th>LNG</th>
              <th>İnformasiya Başlıq AZ</th>
              <th>Dəyər AZ</th>
              <th>İnformasiya Başlıq EN</th>
              <th>Dəyər EN</th>
              <th>İnformasiya Başlıq RU</th>
              <th>Dəyər RU</th>
              <th>Servis adı AZ</th>
              <th>Servis adı EN</th>
              <th>Servis adı RU</th>
              <th>Website Link</th>
              <th>Digər</th>
            </tr>
          </thead>

          <tbody>
            {hasData
              ? fetchData?.map((data: DataTypeCity) => (
                  <React.Fragment key={data?._id}>
                    <tr>
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
                            api="/status-city"
                          />
                        </div>
                      </td>
                      <td>{data?._id}</td>
                      <td>{data?.cityName?.az || ""}</td>
                      <td>{data?.cityName?.en || ""}</td>
                      <td>{data?.cityName?.ru || ""}</td>
                      <td>{data?.coordinates?.lat || ""}</td>
                      <td>{data?.coordinates?.lng || ""}</td>
                      {data?.informations?.map((info: InformationMore) => (
                        <React.Fragment key={info?._id}>
                          <td>{info?.title?.az || ""}</td>
                          <td>{info?.value?.az || ""}</td>
                          <td>{info?.title?.en || ""}</td>
                          <td>{info?.value?.en || ""}</td>
                          <td>{info?.title?.ru || ""}</td>
                          <td>{info?.value?.ru || ""}</td>
                        </React.Fragment>
                      ))}
                      {data?.otherServices?.map((otherServices: otherServices) => (
                        <React.Fragment key={otherServices?._id}>
                          <td>{otherServices?.serviceName?.az || ""}</td>
                          <td>{otherServices?.serviceName?.en || ""}</td>
                          <td>{otherServices?.serviceName?.ru || ""}</td>
                        </React.Fragment>
                      ))}
                      <td>
                        <Link target="_blank" style={{ textDecoration: "none" }} to={data?.websiteLink || ""}>
                          {data?.websiteLink || ""}
                        </Link>
                      </td>
                      <td>
                        <button className="showmorebtn" onClick={() => handleShowTableModal(data?._id)}>
                          <span>Tam Göstər</span>
                          <LuEye className="eye-icon" />
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
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
                  <th>Status</th>
                  <th>ID</th>
                  <th>Şəhər adı (AZ)</th>
                  <th>Şəhər adı (EN)</th>
                  <th>Şəhər adı (RU)</th>
                  <th>LAT</th>
                  <th>LNG</th>
                  <th>İnformasiya Başlıq AZ</th>
                  <th>Dəyər AZ</th>
                  <th>İnformasiya Başlıq EN</th>
                  <th>Dəyər EN</th>
                  <th>İnformasiya Başlıq RU</th>
                  <th>Dəyər RU</th>
                  <th>Servis adı AZ</th>
                  <th>Servis adı EN</th>
                  <th>Servis adı RU</th>
                  <th>Website Link</th>
                </tr>
              </thead>

              <tbody>
                {hasData && isTableModal ? (
                  <tr key={isTableModal?._id}>
                    <td>
                      <div className={`status-btn ${isTableModal?.status === "active" ? "actived" : ""}`}>
                        {isTableModal?.status === "active" ? (
                          <MdSignalWifiStatusbar3Bar className="editicon" />
                        ) : (
                          <MdSignalWifiStatusbarNotConnected className="editicon" />
                        )}
                        <span>{isTableModal?.status}</span>
                        <StatusToggle
                          id={isTableModal?._id}
                          isChange={(newStatus) => updateStatus(isTableModal?._id, newStatus)}
                          api="/status-city"
                        />
                      </div>
                    </td>
                    <td title={isTableModal?._id}>{isTableModal?._id}</td>
                    <td title={isTableModal?.cityName?.az}>{isTableModal?.cityName?.az || ""}</td>
                    <td title={isTableModal?.cityName?.en}>{isTableModal?.cityName?.en || ""}</td>
                    <td title={isTableModal?.cityName?.ru}>{isTableModal?.cityName?.ru || ""}</td>
                    <td title={isTableModal?.coordinates?.lat?.toString()}>{isTableModal?.coordinates?.lat || ""}</td>
                    <td title={isTableModal?.coordinates?.lng?.toString()}>{isTableModal?.coordinates?.lng || ""}</td>
                    {isTableModal?.informations?.map((info: InformationMore) => (
                      <React.Fragment key={info?._id}>
                        <td title={info?.title?.az}>{info?.title?.az || ""}</td>
                        <td title={info?.value?.az}>{info?.value?.az || ""}</td>
                        <td title={info?.title?.en}>{info?.title?.en || ""}</td>
                        <td title={info?.value?.en}>{info?.value?.en || ""}</td>
                        <td title={info?.title?.ru}>{info?.title?.ru || ""}</td>
                        <td title={info?.value?.ru}>{info?.value?.ru || ""}</td>
                      </React.Fragment>
                    ))}
                    {isTableModal?.otherServices?.map((otherServices: otherServices) => (
                      <React.Fragment key={otherServices?._id}>
                        <td title={otherServices?.serviceName?.az}>{otherServices?.serviceName?.az || ""}</td>
                        <td title={otherServices?.serviceName?.en}>{otherServices?.serviceName?.en || ""}</td>
                        <td title={otherServices?.serviceName?.ru}>{otherServices?.serviceName?.ru || ""}</td>
                      </React.Fragment>
                    ))}
                    <td title={isTableModal?.websiteLink}>
                      <Link target="_blank" style={{ textDecoration: "none" }} to={isTableModal?.websiteLink || ""}>
                        {isTableModal?.websiteLink || ""}
                      </Link>
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

export default AddCityShow;
