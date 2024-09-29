import React from "react";
import { SiPowerpages } from "react-icons/si";
import { RiProgress6Line } from "react-icons/ri";

type LastOperationsType = {
  id: number;
  operationName: string;
  operationTime: string;
  operationDate?: string;
  operationDescription: string;
};

const LastOperations: React.FC = () => {
  const Operations: LastOperationsType[] = [
    {
      id: 1,
      operationName: "Hero",
      operationTime: "11.09.2024 - 21:23",
      operationDescription: "Məlumatın silinməsi",
    },
    {
      id: 2,
      operationName: "Hero",
      operationTime: "11.09.2024 - 21:23",
      operationDescription: "Məlumatın silinməsi",
    },
    {
      id: 3,
      operationName: "Hero",
      operationTime: "11.09.2024 - 21:23",
      operationDescription: "Məlumatın silinməsi",
    },
    {
      id: 4,
      operationName: "Hero",
      operationTime: "11.09.2024 - 21:23",
      operationDescription: "Məlumatın silinməsi",
    },
    {
      id: 5,
      operationName: "Hero",
      operationTime: "11.09.2024 - 21:23",
      operationDescription: "Məlumatın silinməsi",
    },
  ];

  return (
    <div className="last-operations">
      <div className="toptitle">
        <h3>Son əməliyyatlar</h3>
        <SiPowerpages className="page-icons" />
      </div>

      <div className="operations">
          {Operations?.map((ops: LastOperationsType) => (
               <section className="operation-card" key={ops?.id}>
                    <div className="left">
                         <RiProgress6Line className="sync-icon"/>
                         <div className="texts">
                              <h4>{ops?.operationName}</h4>
                              <p>{ops?.operationDescription}</p>
                         </div>
                    </div>
                    <div className="right">
                         <span className="date">09.06.2024</span>
                         <p className="time">20:23</p>
                    </div>
               </section>
          ))}
      </div>
    </div>
  );
};

export default LastOperations;
