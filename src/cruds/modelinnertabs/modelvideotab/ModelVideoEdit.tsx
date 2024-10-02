import { useEffect, useState, ChangeEvent } from "react";
import React from "react";
import axios from "axios";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdEdit, MdSignalWifiStatusbar3Bar, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import { DataTypeModelVideoTab } from "./ModelVideoShow";
import { EditModalState, LoadingState } from "../../../recoil/atoms";
import { endpoint } from "../../../Baseurl";
import InputField from "../../../uitils/ui/InputField";
import InputImageField from "../../../uitils/ui/InputImageField";
import SelectStatus from "../../../uitils/ui/SelectStatus";
import ButtonSubmit from "../../../uitils/ui/ButtonSubmit";
import Loader from "../../../Loader";
import Select from 'react-select';

type Props = {
  data: DataTypeModelVideoTab;
};

const ModelVideoEdit: React.FC = () => {
  //for selected model inner contents
  const { data } = useQuery<[]>({
    queryKey: ["fetchDataModelsAll", "az"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/modelstabfront`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "az",
        },
      });
      return response.data;
    },
  });

  //extract for models options
  const models =
    data &&
    data?.map((data: any) => ({
      value: data?._id,
      label: data?.title,
    }));

  const [loading, setLoading] = useRecoilState(LoadingState);

  //fetch data
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeModelVideoTab[]>({
    queryKey: ["fetchDataKey"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/modelvideotab`, {
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

  const columns: GridColDef[] = [
    { field: "titleAz", headerName: "Başlıq AZ", width: 260 },
    { field: "titleEn", headerName: "Başlıq EN", width: 260 },
    { field: "titleRu", headerName: "Başlıq RU", width: 260 },
    { field: "selected_model", headerName: "Modeldədir:", width: 260 },
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
    ? fetchData.map((data: DataTypeModelVideoTab) => ({
        id: data._id,
        titleAz: data?.title?.az,
        titleEn: data?.title?.en,
        titleRu: data?.title?.ru,
        selectedModel: data?.selected_model,
        status: data?.status,
      }))
    : [];

  //EDIT MODAL
  const EditModal: React.FC<Props> = (props) => {
    //states
    const [video, setVideo] = React.useState<File | null>(null);
    const [previewVideo, setPreviewVideo] = React.useState<string>(`https://kaiyi-21d4.onrender.com${props?.data?.video}`);
    const [titleAz, setTitleAz] = useState<string>(props?.data?.title?.az || "");
    const [titleEn, setTitleEn] = useState<string>(props?.data.title?.en || "");
    const [titleRu, setTitleRu] = useState<string>(props?.data.title?.ru || "");
    const [selectedStatus, setSelectedStatus] = React.useState<string>("active");
    const [selectedModel, setSelectedModel] = React.useState<string | null>(props?.data?.selected_model || "");

    const handleSelectStatus = (selectedOption: any) => {
      setSelectedStatus(selectedOption?.value);
    };

    //fill the defaul values
    useEffect(() => {
      setTitleAz(props?.data?.title?.az || "");
      setTitleEn(props?.data?.title?.en || "");
      setTitleRu(props?.data?.title?.ru || "");
      setPreviewVideo(`https://kaiyi-21d4.onrender.com${props?.data?.video}`);
      setSelectedStatus(props?.data?.status || "active");
    }, [props?.data]);

    //upload img
    const handleUpdateImage = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target && e.target.files) {
        const file = e.target.files[0];
        setVideo(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewVideo(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    //edit
    const handleEdit = async (e: React.FormEvent, id: string) => {
      e.preventDefault();

      setLoading(true);

      if (!video) {
        toast.warning("Xana və ya xanalar boş olmamalıdır.", {
          position: "top-center",
        });
        return;
      }

      const formData = new FormData();
      formData.append("title_az", titleAz);
      formData.append("title_en", titleEn);
      formData.append("title_ru", titleRu);
      formData.append("video", video);
      formData.append("selected_model", selectedModel ? selectedModel : "")
      formData.append("status", selectedStatus);

      try {
        const response = await axios.put(`${endpoint}/modelvideotab/${id}`, formData, {
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
              value={titleAz}
              label="Video Tab Hissə Başlıq (AZ)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
            />
            <InputField
              label="Video Tab Hissə Başlıq (EN)"
              placeholder="Məsələn: Example data..."
              value={titleEn}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
            />
            <InputField
              label="Video Tab Hissə Başlıq (RU)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
              value={titleRu}
            />

            <Select
              value={models?.find((option) => option?.value === selectedModel)}
              onChange={(selectedOption) => {
                setSelectedModel(selectedOption?.value);
              }}
              options={models}
              isSearchable={true}
              required
              name="selected_model"
              placeholder="Bu video hansı model içərisində göstərilsin? Seçin..."
            />

            <InputImageField
              labelTitle="Video yüklə"
              req={true}
              onChange={handleUpdateImage}
              name="video"
              accepting={"video/*"}
            />
            {previewVideo && (
              <video
                src={previewVideo}
                controls={true}
                muted={false}
                autoPlay={false}
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            )}

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
        fetchData.map((data: DataTypeModelVideoTab) => {
          if (edit === data?._id) {
            return <EditModal key={data?._id} data={data} />;
          }
          return null;
        })}
    </div>
  );
};

export default ModelVideoEdit;
