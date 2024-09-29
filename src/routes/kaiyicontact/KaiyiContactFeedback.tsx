import React from "react";
import MainTitle from "../../uitils/MainTitle";
import { FaCarOn } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../Loader";
import { endpoint } from "../../Baseurl";

type KaiyiContactFeedbackType = {
  _id: string;
  name: string;
  telephone: string;
  created_at: string;
  hours: string;
};

const KaiyiContactFeedback: React.FC = () => {
  const {
    data: contactFeedbackData,
    isLoading,
    refetch,
  } = useQuery<KaiyiContactFeedbackType[]>({
    queryKey: ["feedbacksKey"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/contact-feedbacks`);
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const hasData = contactFeedbackData && contactFeedbackData?.length > 0;

  const [infoModal, setInfoModal] = React.useState<string | null>(null);

  const handleShowOtherInformations = (_id: string | null) => {
    setInfoModal(_id);
  };

  const findedID = contactFeedbackData?.find((data: KaiyiContactFeedbackType) => {
    return infoModal === data?._id;
  });

  type ModalProps = {
    props: KaiyiContactFeedbackType;
  };
  const ModalForFeedbacks: React.FC<ModalProps> = ({ props }) => {
    const feedbackDivRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      const outsideClicked = (e: MouseEvent) => {
        if (feedbackDivRef && feedbackDivRef?.current && !feedbackDivRef?.current?.contains(e.target as Node)) {
          setInfoModal(null);
        }
      };

      document.addEventListener("mousedown", outsideClicked);
      return () => document.removeEventListener("mousedown", outsideClicked);
    }, []);

    return (
      <div className="modal-testdrive" ref={feedbackDivRef}>
        <CgClose className="close-modal" onClick={() => setInfoModal(null)} />
        <h3>Tam forma</h3>
        <div className="fields">
          <div className="field">
            <span>Datanın ID'si:</span>
            <strong>{props?._id}</strong>
          </div>
          <div className="field">
            <span>Ad:</span>
            <strong>{props?.name}</strong>
          </div>
          <div className="field">
            <span>Telefon:</span>
            <strong>{props?.telephone}</strong>
          </div>
          <div className="field">
            <span>Göndərilmə tarixi:</span>
            <strong>{props?.created_at}</strong>
          </div>
          <div className="field">
            <span>Saat:</span>
            <strong>{props?.hours}</strong>
          </div>
        </div>
      </div>
    );
  };

  React.useEffect(() => {
    refetch();
  }, [contactFeedbackData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="route-component">
      <MainTitle
        children="Əlaqə - Feedback"
        msg="Əlaqə səhifəsi üzərindən gələn geri dönüşlər (Feedbacks) buradadır. Onlara nəzarət edin və ya göndərən şəxslərlə birbaşa əlaqəyə keçin."
      />

      <div className="test-drive-users-table">
        {hasData &&
          contactFeedbackData?.map((data: KaiyiContactFeedbackType) => (
            <section key={data?._id} className="section-data">
              <FaCarOn className="car-icon" />
              <div className="user-info">
                <FaUserAlt className="user" />
                <div className="info-desc">
                  <span className="name">
                    <span>Ad:</span> {data?.name}
                  </span>
                  <span className="date">
                    <span>Göndərilmə tarixi:</span> {data?.created_at}
                  </span>
                  <span className="hour">
                    <span>Göndərilmə vaxtı:</span> {data?.hours}
                  </span>
                </div>
              </div>
              <div className="button">
                <button onClick={() => handleShowOtherInformations(data?._id)}>Müraciətə ətraflı bax</button>
              </div>
            </section>
          ))}
      </div>

      <div className={`overlay-testdrive ${findedID?._id ? "active" : ""}`}>
        {findedID?._id && <ModalForFeedbacks props={findedID} />}
      </div>
    </div>
  );
};

export default KaiyiContactFeedback;
