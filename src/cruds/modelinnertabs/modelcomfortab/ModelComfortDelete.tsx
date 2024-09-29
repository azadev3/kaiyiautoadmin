import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { endpoint } from "../../../Baseurl";
import Loader from "../../../Loader";
import { useRecoilValue } from "recoil";
import { ComponentModalStateRemove } from "../../../recoil/atoms";
import { DataTypeModelComfort } from "./ModelComfortShow";

const ModelComfortDelete: React.FC = () => {
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeModelComfort[]>({
    queryKey: ["fetchDataKeyModelComfortTab"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/modelcomfortab`, {
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
      const response = await axios.delete(`${endpoint}/modelcomfortab/${id}`);
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
    { field: "img", headerName: "Şəkil", width: 860 },
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
      ? fetchData.map((data: DataTypeModelComfort) => ({
          id: data._id,
          img: data?.image,
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

export default ModelComfortDelete;
