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

export type DataTypeTranslate = {
  _id: string;
  key: string;
  azTitle: string;
  enTitle: string;
  ruTitle: string;
};

const TranslatesShow: React.FC = () => {
  const { data: fetchData, isLoading } = useQuery<DataTypeTranslate[]>({
    queryKey: ["fetchDataKeyTranslates"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/translates`, {
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
    fetchData?.find((data: DataTypeTranslate) => {
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
              <th>Key</th>
              <th>Azərbaycanca</th>
              <th>İngiliscə</th>
              <th>Rusca</th>
              <th>Digər</th>
            </tr>
          </thead>

          <tbody>
            {hasData
              ? fetchData?.map((data: DataTypeTranslate) => (
                  <tr key={data?._id}>
                    <td>{data?._id}</td>
                    <td>{data?.key}</td>
                    <td>{data?.azTitle}</td>
                    <td>{data?.enTitle}</td>
                    <td>{data?.ruTitle}</td>
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
                  <th>Key</th>
                  <th>Azərbaycanca</th>
                  <th>İngiliscə</th>
                  <th>Rusca</th>
                </tr>
              </thead>

              <tbody>
                {hasData && isTableModal ? (
                  <tr>
                    <td title={isTableModal?._id}>{isTableModal?._id}</td>
                    <td title={isTableModal?.key}>{isTableModal?.key}</td>
                    <td title={isTableModal?.azTitle}>{isTableModal?.azTitle}</td>
                    <td title={isTableModal?.enTitle}>{isTableModal?.enTitle}</td>
                    <td title={isTableModal?.ruTitle}>{isTableModal?.ruTitle}</td>
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

export default TranslatesShow;
