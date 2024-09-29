import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { endpoint } from "../../Baseurl";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "../../Loader";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DataTypeCar } from "./AddCarShow";

const AddCarDelete: React.FC = () => {
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeCar[]>({
    queryKey: ["fetchDataKeyAddCar"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/add-car`, {
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
      const response = await axios.delete(`${endpoint}/add-car/${id}`);
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
     { field: "titleAz", headerName: "Başlıq (AZ)", width: 160 },
     { field: "titleEn", headerName: "Başlıq (EN)", width: 160 },
     { field: "titleRu", headerName: "Başlıq (RU)", width: 160 },
     { field: "year", headerName: "İl", width: 160 },
     { field: "vin", headerName: "VIN", width: 160 },
     { field: "price", headerName: "Qiymət", width: 160 },
     { field: "selected_model", headerName: "Aid Olduğu Model", width: 160 },
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
      ? fetchData.map((data: DataTypeCar) => ({
          id: data?._id,
          titleAz: data?.title?.az,
          titleEn: data?.title?.en,
          titleRu: data?.title?.ru,
          year: data?.year,
          vin: data?.vin,
          price: data?.price,
          selected_model: data?.selected_model,
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

export default AddCarDelete;
