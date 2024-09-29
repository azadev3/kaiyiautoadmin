import React from "react";
import MainTitle from "../../uitils/MainTitle";
import { FaCarOn } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../Loader";
import { endpoint } from "../../Baseurl";

type DealerContactsType = {
  _id: string;
  city: string;
  dealerCenter: string;
  name: string;
  surname: string;
  email: string;
  telephone: string;
  created_at: string;
  hours: string;
};

const DealerContacts: React.FC = () => {
  const {
    data: dealerContactsData,
    isLoading,
    refetch,
  } = useQuery<DealerContactsType[]>({
    queryKey: ["dealerContactsKey"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/dealer-contacts`);
      return response.data;
    },
    staleTime: 1000 * 60 * 60,
  });

  const hasData = dealerContactsData && dealerContactsData?.length > 0;

  const [infoModal, setInfoModal] = React.useState<string | null>(null);

  const handleShowOtherInformations = (_id: string | null) => {
    setInfoModal(_id);
  };

  const findedID = dealerContactsData?.find((data: DealerContactsType) => {
    return infoModal === data?._id;
  });

  type ModalProps = {
    props: DealerContactsType;
  };
  const ModalForContactsDealer: React.FC<ModalProps> = ({ props }) => {
    const dealerContactsDivRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      const outsideClicked = (e: MouseEvent) => {
        if (
          dealerContactsDivRef &&
          dealerContactsDivRef?.current &&
          !dealerContactsDivRef?.current?.contains(e.target as Node)
        ) {
          setInfoModal(null);
        }
      };

      document.addEventListener("mousedown", outsideClicked);
      return () => document.removeEventListener("mousedown", outsideClicked);
    }, []);

    return (
      <div className="modal-testdrive" ref={dealerContactsDivRef}>
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
            <span>Soyad:</span>
            <strong>{props?.surname}</strong>
          </div>
          <div className="field">
            <span>Şəhər:</span>
            <strong>{props?.city}</strong>
          </div>
          <div className="field">
            <span>Diler Mərkəzi:</span>
            <strong>{props?.dealerCenter}</strong>
          </div>
          <div className="field">
            <span>Email:</span>
            <strong>{props?.email}</strong>
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
  }, [dealerContactsData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="route-component">
      <MainTitle
        children="Dilerlə Əlaqə Yaradanlar"
        msg="Satış Nöqtəsi Tap səhifəsindən Dilerlə Əlaqə sorğusu göndərən şəxslər buradadır"
      />

      <div className="test-drive-users-table">
        {hasData &&
          dealerContactsData?.map((data: DealerContactsType) => (
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
        {findedID?._id && <ModalForContactsDealer props={findedID} />}
      </div>
    </div>
  );
};

export default DealerContacts;
