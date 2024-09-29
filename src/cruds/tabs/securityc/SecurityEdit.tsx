import { useEffect, useState, ChangeEvent } from "react";
import React from "react";
import axios from "axios";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdEdit, MdSignalWifiStatusbar3Bar, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import { EditModalState, LoadingState } from "../../../recoil/atoms";
import { useQuery } from "@tanstack/react-query";
import { endpoint } from "../../../Baseurl";
import ButtonSubmit from "../../../uitils/ui/ButtonSubmit";
import Loader from "../../../Loader";
import InputImageField from "../../../uitils/ui/InputImageField";
import InputField from "../../../uitils/ui/InputField";
import { DataTypeSecurity } from "./SecurityShow";
import SelectStatus from "../../../uitils/ui/SelectStatus";

type Props = {
  data: DataTypeSecurity;
};

const SecurityEdit: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  //fetch data
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeSecurity[]>({
    queryKey: ["fetchDataKeySecurityTab"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/securitytab`, {
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
    { field: "descriptionAz", headerName: "Açıqlama AZ", width: 200 },
    { field: "descriptionEn", headerName: "Açıqlama EN", width: 200 },
    { field: "descriptionRu", headerName: "Açıqlama RU", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <button className={`status-btn ${params?.row?.status === "active" ? "actived" : ""}`}>
            {params?.row?.status === "active" ? <MdSignalWifiStatusbar3Bar className="editicon" /> : <MdSignalWifiStatusbarNotConnected className="editicon" />}
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
    ? fetchData.map((data: DataTypeSecurity) => ({
        id: data._id,
        titleAz: data?.title?.az,
        titleEn: data?.title?.en,
        titleRu: data?.title?.ru,
        descriptionAz: data?.description?.az,
        descriptionEn: data?.description?.en,
        descriptionRu: data?.description?.ru,
        status: data?.status,
      }))
    : [];

  //EDIT MODAL
  const EditModal: React.FC<Props> = (props) => {
    //states

    const [previewImg, setPreviewImg] = useState<string>(`http://localhost:3000${props?.data?.image}`);
    const [image, setImage] = React.useState<File | null>(null);
    const [previewVideo, setPreviewVideo] = React.useState<string>(`http://localhost:3000${props?.data?.video}`);
    const [video, setVideo] = React.useState<File | null>(null);

    const [descriptionAz, setDescriptionAz] = React.useState<string>(props?.data?.description?.az || "");
    const [descriptionEn, setDescriptionEn] = React.useState<string>(props?.data?.description?.en || "");
    const [descriptionRu, setDescriptionRu] = React.useState<string>(props?.data?.description?.ru || "");
    const [titleAz, setTitleAz] = useState<string>(props?.data?.title?.az || "");
    const [titleEn, setTitleEn] = useState<string>(props?.data.title?.en || "");
    const [titleRu, setTitleRu] = useState<string>(props?.data.title?.ru || "");
    const [selectedStatus, setSelectedStatus] = React.useState<string>("active");
    const [selectedOption, setSelectedOption] = React.useState<string>("");
    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(e.target.value);
    };
    const handleSelectStatus = (selectedOption: any) => {
      setSelectedStatus(selectedOption?.value);
    };

    //fill the defaul values
    useEffect(() => {
      setTitleAz(props?.data?.title?.az || "");
      setTitleEn(props?.data?.title?.en || "");
      setTitleRu(props?.data?.title?.ru || "");
      setDescriptionAz(props?.data?.description?.az || "");
      setDescriptionEn(props?.data?.description?.en || "");
      setDescriptionRu(props?.data?.description?.ru || "");
      setPreviewImg(`http://localhost:3000${props?.data?.image}`);
      setPreviewVideo(`http://localhost:3000${props?.data?.video}`);
      setSelectedStatus(props?.data?.status || "active");
      setSelectedOption(props?.data?.selectedOption || "");
    }, [props?.data]);

    //upload img
    const handleUpdateImage = async (e: ChangeEvent<HTMLInputElement>) => {
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
    const handleChangevideo = (e: ChangeEvent<HTMLInputElement>) => {
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
      formData.append("img", image);
      formData.append("video", video ? video : "");
      formData.append("title_az", titleAz);
      formData.append("title_en", titleEn);
      formData.append("title_ru", titleRu);
      formData.append("description_az", descriptionAz);
      formData.append("description_en", descriptionEn);
      formData.append("description_ru", descriptionRu);
      formData.append("status", selectedStatus);
      formData.append("selected_option", selectedOption ? selectedOption : "");

      try {
        const response = await axios.put(`${endpoint}/securitytab/${id}`, formData, {
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
              label="Security Başlıq (AZ)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
            />
            <InputField
              label="Security Başlıq (EN)"
              placeholder="Məsələn: Example data..."
              value={titleEn}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
            />
            <InputField
              label="Security Başlıq (RU)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
              value={titleRu}
            />
            <InputField
              label="Açıqlama (AZ)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionAz(e.target.value)}
              value={descriptionAz}
              maxLength={80}
            />
            <InputField
              label="Açıqlama (EN)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionEn(e.target.value)}
              value={descriptionEn}
              maxLength={80}
            />
            <InputField
              label="Açıqlama (RU)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionRu(e.target.value)}
              value={descriptionRu}
              maxLength={80}
            />

            <InputImageField onChange={handleUpdateImage} name="img" />
            {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}

            <InputImageField req={true} onChange={handleChangevideo} name="video" accepting={"video/*"} />
            {previewVideo && <video src={previewVideo} controls={true} muted={false} autoPlay={false} style={{ maxWidth: "200px", marginTop: "10px" }} />}
            <SelectStatus onChange={handleSelectStatus} selectedStatus={props?.data?.status || "active"} />

            <div className="selected-item">
              <div className="label-radio">
                <label>
                  <input required name="mediatype" type="radio" value="isVideo" onChange={handleRadioChange} checked={selectedOption === "isVideo"} />
                  <span>Video olsun</span>
                </label>
              </div>
              <div className="label-radio">
                <label>
                  <input required name="mediatype" type="radio" value="isImage" onChange={handleRadioChange} checked={selectedOption === "isImage"} />
                  <span>Şəkil olsun</span>
                </label>
              </div>
            </div>
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
        fetchData.map((data: DataTypeSecurity) => {
          if (edit === data?._id) {
            return <EditModal key={data?._id} data={data} />;
          }
          return null;
        })}
    </div>
  );
};

export default SecurityEdit;
