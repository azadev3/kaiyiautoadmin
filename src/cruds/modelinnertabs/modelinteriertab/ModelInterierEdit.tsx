import { useEffect, useState, ChangeEvent } from "react";
import React from "react";
import axios from "axios";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdEdit, MdSignalWifiStatusbar3Bar, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import { EditModalState, LoadingState } from "../../../recoil/atoms";
import { endpoint } from "../../../Baseurl";
import InputField from "../../../uitils/ui/InputField";
import InputImageField from "../../../uitils/ui/InputImageField";
import SelectStatus from "../../../uitils/ui/SelectStatus";
import ButtonSubmit from "../../../uitils/ui/ButtonSubmit";
import Loader from "../../../Loader";
import { DataTypeModelInterierTab } from "./ModelInterierShow";
import Select from "react-select";

type Props = {
  data: DataTypeModelInterierTab;
};

const ModelInterierEdit: React.FC = () => {
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
  } = useQuery<DataTypeModelInterierTab[]>({
    queryKey: ["fetchDataModelInterierKey"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/modelinteriertab`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
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
    { field: "modelTitleAz", headerName: "Ad AZ", width: 260 },
    { field: "modelTitleEn", headerName: "Ad EN", width: 260 },
    { field: "modelTitleRu", headerName: "Ad RU", width: 260 },
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
    ? fetchData.map((data: DataTypeModelInterierTab) => ({
        id: data._id,
        titleAz: data?.title?.az,
        titleEn: data?.title?.en,
        titleRu: data?.title?.ru,
        descriptionAz: data?.modelTitle?.az,
        descriptionEn: data?.modelTitle?.en,
        descriptionRu: data?.modelTitle?.ru,
        selectedModel: data?.selected_model,
        status: data?.status,
      }))
    : [];

  //EDIT MODAL
  const EditModal: React.FC<Props> = (props) => {
    //states
    const [titleAz, setTitleAz] = useState<string>(props?.data?.title?.az || "");
    const [titleEn, setTitleEn] = useState<string>(props?.data.title?.en || "");
    const [titleRu, setTitleRu] = useState<string>(props?.data.title?.ru || "");
    const [modelTitleAz, setModelTitleAz] = React.useState<string>(props?.data?.modelTitle?.az || "");
    const [modelTitleEn, setModelTitleEn] = React.useState<string>(props?.data?.modelTitle?.en || "");
    const [modelTitleRu, setModelTitleRu] = React.useState<string>(props?.data?.modelTitle?.ru || "");
    const [previewImg, setPreviewImg] = React.useState<string>(`http://localhost:3000${props?.data?.image}` || "");
    const [image, setImage] = React.useState<File | null>(null);
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
      setModelTitleAz(props?.data?.modelTitle?.az || "");
      setModelTitleEn(props?.data?.modelTitle?.en || "");
      setModelTitleRu(props?.data?.modelTitle?.ru || "");
      setPreviewImg(`http://localhost:3000${props?.data?.image}` || "");
      setSelectedStatus(props?.data?.status || "active");
    }, [props?.data]);

    //upload img
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target && e.target.files) {
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImg(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    //edit
    const handleEdit = async (e: React.FormEvent, id: string) => {
      e.preventDefault();

      setLoading(true);

      if (!image) {
        toast.warning("Xana və ya xanalar boş olmamalıdır.", {
          position: "top-center",
        });
        return;
      }

      const formData = new FormData();
      formData.append("titleAz", titleAz);
      formData.append("titleEn", titleEn);
      formData.append("titleRu", titleRu);
      formData.append("modelTitleAz", modelTitleAz);
      formData.append("modelTitleEn", modelTitleEn);
      formData.append("modelTitleRu", modelTitleRu);
      formData.append("status", selectedStatus);
      formData.append("img", image ? image : "");
      formData.append("selected_model", selectedModel ? selectedModel : "");

      try {
        const response = await axios.put(`${endpoint}/modelinteriertab/${id}`, formData, {
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
              label="Interier Tab Hissə Başlıq (AZ)"
              placeholder="Məsələn: Example data..."
              required={true}
              name="titleAz"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
            />
            <InputField
              label="Interier Tab Hissə Başlıq (EN)"
              placeholder="Məsələn: Example data..."
              value={titleEn}
              required={true}
              name="titleEn"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
            />
            <InputField
              label="Interier Tab Hissə Başlıq (RU)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
              value={titleRu}
              required={true}
              name="titleRu"
            />
            <InputField
              label="Interier Tab Hissə Karuseldəki Ad (AZ) (maksimum: 50 hərf)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setModelTitleAz(e.target.value)}
              value={modelTitleAz}
              maxLength={50}
            />
            <InputField
              label="Interier Tab Hissə Açıqlama (EN) (maksimum: 50 hərf)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setModelTitleEn(e.target.value)}
              value={modelTitleEn}
              maxLength={50}
            />
            <InputField
              label="Interier Tab Hissə Açıqlama (RU) (maksimum: 50 hərf)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setModelTitleRu(e.target.value)}
              value={modelTitleRu}
              maxLength={50}
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

            <InputImageField onChange={handleChange} name="img" />
            {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}

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
        fetchData.map((data: DataTypeModelInterierTab) => {
          if (edit === data?._id) {
            return <EditModal key={data?._id} data={data} />;
          }
          return null;
        })}
    </div>
  );
};

export default ModelInterierEdit;
