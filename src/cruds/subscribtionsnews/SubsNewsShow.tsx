import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loader from "../../Loader";
import { endpoint } from "../../Baseurl";
import { LuEye } from "react-icons/lu";
import { FaInfo } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { isTableModalState } from "../../recoil/atoms";
import { RiCloseFill } from "react-icons/ri";

export type DataTypeSubscribtionNewsEmails = {
  _id: string;
  email: string;
  created_at: string;
};

const SubsNewsShow: React.FC = () => {
  const { data: fetchData, isLoading } = useQuery<DataTypeSubscribtionNewsEmails[]>({
    queryKey: ["fetchDataKeySubNews"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/subscribeNews`);
      return response.data;
    },
  });

  //this function open the table more modal
  const [tableModal, setTableModal] = useRecoilState(isTableModalState);
  const handleShowTableModal = (id: string) => {
    setTableModal(id);
  };

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

  const hasData = fetchData && fetchData?.length > 0;

  const isTableModal =
    hasData &&
    fetchData?.find((data: DataTypeSubscribtionNewsEmails) => {
      return tableModal === data?._id;
    });

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
              <th>ID</th>
              <th>Email</th>
              <th>Yaranma tarixi</th>
              <th>Digər</th>
            </tr>
          </thead>

          <tbody>
            {hasData
              ? fetchData?.map((data: DataTypeSubscribtionNewsEmails) => (
                  <tr>
                    <td>{data?._id}</td>
                    <td>{data?.email}</td>
                    <td style={{ fontWeight: "bold" }}>{data?.created_at}</td>
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
          <div className="info-area">
            <RiCloseFill className="close" onClick={() => setTableModal("")} />
            <FaInfo className="info-icon" />
          </div>
          <section className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Yaranma tarixi</th>
                  <th>Digər</th>
                </tr>
              </thead>

              <tbody>
                {hasData &&
                  fetchData?.map((data: DataTypeSubscribtionNewsEmails) => (
                    <tr>
                      <td>{data?._id}</td>
                      <td>{data?.email}</td>
                      <td style={{ fontWeight: "bold" }}>{data?.created_at}</td>
                      <td>Göstəriləcək əməliyyat yoxdur.</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SubsNewsShow;
