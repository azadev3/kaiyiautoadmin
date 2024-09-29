import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent } from "react";
import { endpoint } from "../../Baseurl";
import axios from "axios";
import Loader from "../../Loader";
import { IoChevronBackOutline } from "react-icons/io5";
import ButtonSubmit from "../../uitils/ui/ButtonSubmit";
import { EditModalState, LoadingState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdEdit, MdSignalWifiStatusbar3Bar, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import SelectStatus from "../../uitils/ui/SelectStatus";
import { DataTypeDealerCenter } from "./AddDealerShow";
import InputField from "../../uitils/ui/InputField";

const AddDealerEdit: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

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

  const hasData = fetchData && fetchData?.length > 0;

  const [edit, setEdit] = useRecoilState(EditModalState);
  const getEditModal = (_id: string) => {
    setEdit(_id);
  };

  type props = {
    data: DataTypeDealerCenter;
  };

  const columns: GridColDef[] = [
    { field: "dealerNameAz", headerName: "Diler Mərkəzi Adı (AZ)", width: 200 },
    { field: "dealerNameEn", headerName: "Diler Mərkəzi Adı (EN)", width: 200 },
    { field: "dealerNameRu", headerName: "Diler Mərkəzi Adı (RU)", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <button className={`status-btn ${params?.row?.status === "active" ? "actived" : ""}`}>
            {params?.row?.status === "active" ? (
              <MdSignalWifiStatusbar3Bar className="editicon" />
            ) : (
              <MdSignalWifiStatusbarNotConnected className="editicon" />
            )}
            <span>{params?.row?.status}</span>
          </button>
        );
      },
    },
    {
      field: "actions",
      headerName: "Əməliyyat",
      width: 150,
      renderCell: (params) => {
        return (
          <button className="edit-btn" onClick={() => getEditModal(params?.row?.id)}>
            <MdEdit className="editicon" />
            <span>Düzəliş et</span>
          </button>
        );
      },
    },
  ];

  const rows = hasData
    ? fetchData.map((data: DataTypeDealerCenter) => ({
        id: data?._id,
        dealerNameAz: data?.dealerName?.az,
        dealerNameEn: data?.dealerName?.en,
        dealerNameRu: data?.dealerName?.ru,
        status: data?.status,
      }))
    : [];

  // EDIT MODAL
  const EditModal: React.FC<props> = (props) => {
    const [selectedStatus, setSelectedStatus] = React.useState<string>("active");
    const [dealerNameAz, setDealerNameAz] = React.useState<string>(props?.data?.dealerName?.az || "");
    const [dealerNameEn, setDealerNameEn] = React.useState<string>(props?.data?.dealerName?.en || "");
    const [dealerNameRu, setDealerNameRu] = React.useState<string>(props?.data?.dealerName?.ru || "");

    const handleSelectStatus = (selectedOption: any) => {
      setSelectedStatus(selectedOption?.value);
    };

    const handleEdit = async (e: React.FormEvent, id: string) => {
      e.preventDefault();

      setLoading(true);

      const formData = new FormData();
      formData.append("status", selectedStatus);
      formData.append("dealerNameAz", dealerNameAz);
      formData.append("dealerNameEn", dealerNameEn);
      formData.append("dealerNameRu", dealerNameRu);

      try {
        const response = await axios.put(`${endpoint}/add-dealer/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data) {
          toast.success("Əla! Uğurla əlavə edildi.", {
            position: "top-center",
          });
          refetch();
        } else {
          toast.error("Bir problem oldu.", {
            position: "top-center",
          });
        }
      } catch (error) {
        console.error("Error 3:", error);
        toast.error("Bir problem oldu.", {
          position: "top-center",
        });
      } finally {
        setLoading(true);
        const timeout = setTimeout(() => {
          setLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
      }
    };

    return (
      <div className="edit-modal">
        <div className="go-back" onClick={() => setEdit("")}>
          <IoChevronBackOutline className="backicon" />
          <span>Vazgeç</span>
        </div>
        <div className="edit-container">
          <form acceptCharset="UTF-8" onSubmit={(e: React.FormEvent) => handleEdit(e, props?.data?._id)}>
            <InputField
              name="dealerNameAz"
              placeholder="Diler mərkəzinin adı"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDealerNameAz(e.target.value)}
              value={dealerNameAz}
              required
              label="Diler mərkəzinin adını yazın (AZ)"
            />
            <InputField
              name="dealerNameEn"
              placeholder="Diler mərkəzinin adı"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDealerNameEn(e.target.value)}
              value={dealerNameEn}
              required
              label="Diler mərkəzinin adını yazın (EN)"
            />
            <InputField
              name="dealerNameRu"
              placeholder="Diler mərkəzinin adı"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDealerNameRu(e.target.value)}
              value={dealerNameRu}
              required
              label="Diler mərkəzinin adını yazın (RU)"
            />
            <SelectStatus onChange={handleSelectStatus} selectedStatus={props?.data?.status || "active"} />
            <ButtonSubmit isLoading={loading} />
          </form>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="edit-component">
      <div style={{ height: 490, width: "100%" }}>
        <DataGrid style={{ height: "490px" }} rows={rows} columns={columns} />
      </div>

      {hasData &&
        fetchData?.map((data: DataTypeDealerCenter) => {
          if (edit === data._id) {
            return <EditModal key={data?._id} data={data} />;
          }
        })}
    </div>
  );
};

export default AddDealerEdit;
