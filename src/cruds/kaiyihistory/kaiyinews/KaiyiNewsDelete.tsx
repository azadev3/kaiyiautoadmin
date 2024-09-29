import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Loader from "../../../Loader";
import { endpoint } from "../../../Baseurl";
import { DataTypeKaiyiNews } from "./KaiyiNewsShow";

const KaiyiNewsDelete: React.FC = () => {
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeKaiyiNews[]>({
    queryKey: ["fetchDataKeyKaiyiHistoryNews"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/kaiyi-history-news`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    staleTime: 3000000,
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${endpoint}/kaiyi-history-news/${id}`);
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
    { field: "title_az", headerName: "Başlıq AZ", width: 260 },
    { field: "title_en", headerName: "Başlıq EN", width: 260 },
    { field: "title_ru", headerName: "Başlıq RU", width: 260 },
    { field: "slogan_az", headerName: "Sloqan AZ", width: 260 },
    { field: "slogan_en", headerName: "Sloqan EN", width: 260 },
    { field: "slogan_ru", headerName: "Sloqan RU", width: 260 },
    { field: "description_az", headerName: "Açıqlama AZ", width: 180 },
    { field: "description_en", headerName: "Açıqlama EN", width: 180 },
    { field: "description_ru", headerName: "Açıqlama RU", width: 180 },
    { field: "created_at", headerName: "Tarix", width: 180 },
    { field: "hours", headerName: "Saat", width: 180 },
    {
      field: "actions",
      headerName: "Əməliyyat",
      width: 150,
      renderCell: (params) => {
        return (
          <button className="delete-btn" onClick={() => handleDelete(params?.row?.id)}>
            <MdDelete className="delicon" />
            <span>Sil</span>
          </button>
        );
      },
    },
  ];

  const rows =
    fetchData && fetchData?.length > 0
      ? fetchData.map((data: DataTypeKaiyiNews) => ({
          id: data._id,
          title_az: data?.title?.az,
          title_en: data?.title?.en,
          title_ru: data?.title?.ru,
          slogan_az: data?.slogan?.az,
          slogan_en: data?.slogan?.en,
          slogan_ru: data?.slogan?.ru,
          description_az: data?.description?.az,
          description_en: data?.description?.en,
          description_ru: data?.description?.ru,
          created_at: data?.created_at,
          hours: data?.hours,
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

export default KaiyiNewsDelete;
