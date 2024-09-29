import React from "react";

type props = {
  cardTitle?: string;
  cardParagraph?: string;
  dataID?: string;
  cardProfile?: boolean;
  profileSrc?: string;
  cardName: string;
  onClick?: (_id: string) => void;
  modalContent?: React.JSX.Element;
};

const Card: React.FC<props> = (props) => {
  return (
    <div
      className="card"
      onClick={() => {
        if (props.onClick && props.dataID) {
          props.onClick(props.dataID);
        }
      }}>
      {props.modalContent}
      <div className="card-content">
        {props.cardProfile && (
          <div className="card-profile">
            <img src={props?.profileSrc} alt="" />
          </div>
        )}

        <p className="card-title">{props.cardTitle}</p>
        <p className="card-name">
          Data gəlir: <strong>{props.cardName}</strong>
        </p>
        <p className="card-para">{props.cardParagraph}</p>
        <p className="card-para">
          <strong>ID:</strong> {props.dataID}
        </p>
      </div>
    </div>
  );
};

export default Card;
