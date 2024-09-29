import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { endpoint } from "../../Baseurl";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "../../Loader";
import { DataTypeTelephone } from "./TelephoneShow";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const TelephoneDelete: React.FC = () => {
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeTelephone[]>({
    queryKey: ["fetchDataKeyTelephone"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/telephone`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    },
    staleTime: 3000000,
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${endpoint}/telephone/${id}`);
      if (response.data) {
        toast.success("Silindi!", {
          position: "top-center",
        });
        refetch();
      } else {
        toast.error("Silinmədi :(", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Bir problem oldu :(", {
        position: "top-center",
      });
    }
  };

  const columns: GridColDef[] = [
    { field: "titleAz", headerName: "Başlıq AZ", width: 260 },
    { field: "titleEn", headerName: "Başlıq EN", width: 260 },
    { field: "titleRu", headerName: "Başlıq RU", width: 260 },
    { field: "telephone", headerName: "Telefon", width: 200 },
    {
      field: "actions",
      headerName: "Əməliyyat",
      width: 150,
      renderCell: (params) => {
        return (
          <button className="delete-btn" onClick={() => handleDelete(params?.row?.id)}>
            <MdDelete className="delicon"/>
           <span>Sil</span>
          </button>
        );
      },
    },
  ];

  const rows =
    fetchData && fetchData?.length > 0
      ? fetchData.map((data: DataTypeTelephone) => ({
          id: data._id,
          titleAz: data?.title?.az,
          titleEn: data?.title?.en,
          titleRu: data?.title?.ru,
          telephone: data?.telephone,
        }))
      : [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="delete-component">
      <div style={{ height: 490, width: "100%" }}>
        <DataGrid style={{ height: "490px" }} rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export default TelephoneDelete;
