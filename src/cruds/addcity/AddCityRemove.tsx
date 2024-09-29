import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import { endpoint } from "../../Baseurl";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "../../Loader";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DataTypeCity } from "./AddCityShow";

const AddCityRemove: React.FC = () => {
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeCity[]>({
    queryKey: ["fetchDataKeyCities"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/city`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data?.cities;
    },
    staleTime: 3000000,
  });

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${endpoint}/city/${id}`);
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
    { field: "cityNameAz", headerName: "Şəhər adı AZ", width: 78 },
    { field: "cityNameEn", headerName: "Şəhər adı EN", width: 78 },
    { field: "cityNameRu", headerName: "Şəhər adı RU", width: 78 },
    { field: "lat", headerName: "LAT", width: 78 },
    { field: "lng", headerName: "LNG", width: 78 },
    { field: "titleAz", headerName: "İnformasiya Başlıq AZ", width: 78 },
    { field: "valueAz", headerName: "Dəyər AZ", width: 78 },
    { field: "titleEn", headerName: "İnformasiya Başlıq EN", width: 78 },
    { field: "valueEn", headerName: "Dəyər EN", width: 78 },
    { field: "titleRu", headerName: "İnformasiya Başlıq RU", width: 78 },
    { field: "valueRu", headerName: "Dəyər RU", width: 78 },
    { field: "serviceNameAz", headerName: "Servis adı AZ", width: 78 },
    { field: "serviceNameEn", headerName: "Servis adı EN", width: 78 },
    { field: "serviceNameRu", headerName: "Servis adı RU", width: 78 },
    { field: "websiteLink", headerName: "Website Link", width: 78 },
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
      ? fetchData.map((data: DataTypeCity) => ({
          id: data?._id,
          cityNameAz: data?.cityName?.az || "",
          cityNameEn: data?.cityName?.en || "",
          cityNameRu: data?.cityName?.ru || "",
          lat: data?.coordinates?.lat || "",
          lng: data?.coordinates?.lng || "",
          titleAz: data?.informations ? data?.informations[0]?.title?.az || "" : "",
          valueAz: data?.informations ? data?.informations[0]?.value?.az || "" : "",
          titleEn: data?.informations ? data?.informations[0]?.title?.en || "" : "",
          valueEn: data?.informations ? data?.informations[0]?.value?.en || "" : "",
          titleRu: data?.informations ? data?.informations[0]?.title?.ru || "" : "",
          valueRu: data?.informations ? data?.informations[0]?.value?.ru || "" : "",
          serviceNameAz: data?.otherServices ? data?.otherServices[0]?.serviceName?.az || "" : "",
          serviceNameEn: data?.otherServices ? data?.otherServices[0]?.serviceName?.en || "" : "",
          serviceNameRu: data?.otherServices ? data?.otherServices[0]?.serviceName?.ru || "" : "",
          websiteLink: data?.websiteLink || "",
          status: data?.status,
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

export default AddCityRemove;
