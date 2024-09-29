import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { endpoint } from "../../Baseurl";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "../../Loader";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DataTypeDealerCenter } from "./AddDealerShow";

const AddDealerDelete: React.FC = () => {
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeDealerCenter[]>({
    queryKey: ["fetchDataKeyDealer"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/add-dealer`, {
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
      const response = await axios.delete(`${endpoint}/add-dealer/${id}`);
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
    { field: "dealerNameAz", headerName: "Diler Mərkəzi Adı (AZ)", width: 200 },
    { field: "dealerNameEn", headerName: "Diler Mərkəzi Adı (EN)", width: 200 },
    { field: "dealerNameRu", headerName: "Diler Mərkəzi Adı (RU)", width: 200 },
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
      ? fetchData.map((data: DataTypeDealerCenter) => ({
          id: data?._id,
          dealerNameAz: data?.dealerName?.az,
          dealerNameEn: data?.dealerName?.en,
          dealerNameRu: data?.dealerName?.ru,
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

export default AddDealerDelete;
