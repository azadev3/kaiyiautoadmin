import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRecoilValue } from "recoil";
import { endpoint } from "../../Baseurl";
import { DataTypeRepairRulesDownload } from "./RepairRulesDownloadShow";
import { ComponentModalStateRemove } from "../../recoil/atoms";
import Loader from "../../Loader";

const RepairRulesDownloadDelete: React.FC = () => {
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeRepairRulesDownload[]>({
    queryKey: ["fetchDataKeyRepairRulesDownload"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/repair-rules-download`, {
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
      const response = await axios.delete(`${endpoint}/repair-rules-download/${id}`);
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
    { field: "title_az", headerName: "Başlıq (AZ)", width: 260 },
    { field: "title_en", headerName: "Başlıq (EN)", width: 260 },
    { field: "title_ru", headerName: "Başlıq (RU)", width: 260 },
    { field: "pdf", headerName: "PDF", width: 260 },
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
      ? fetchData.map((data: DataTypeRepairRulesDownload) => ({
          id: data._id,
          title_az: data?.title?.az,
          title_en: data?.title?.en,
          title_ru: data?.title?.ru,
          pdf: data?.pdfs,
        }))
      : [];

  const componentModalRemove = useRecoilValue(ComponentModalStateRemove);

  React.useEffect(() => {
    refetch();
  }, [componentModalRemove]);

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

export default RepairRulesDownloadDelete;
