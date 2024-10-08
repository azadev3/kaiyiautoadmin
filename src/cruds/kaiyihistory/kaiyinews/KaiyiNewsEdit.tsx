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
import Loader from "../../../Loader";
import ButtonSubmit from "../../../uitils/ui/ButtonSubmit";
import SelectStatus from "../../../uitils/ui/SelectStatus";
import InputImageField from "../../../uitils/ui/InputImageField";
import moment from "moment";
import MyEditor from "../../../Tiptap";
import { DataTypeKaiyiNews } from "./KaiyiNewsShow";

type Props = {
  data: DataTypeKaiyiNews;
};

const KaiyiNewsEdit: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  //fetch data
  const { data: fetchData, isLoading } = useQuery<DataTypeKaiyiNews[]>({
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

  const hasData = fetchData && fetchData?.length > 0;

  const [edit, setEdit] = useRecoilState(EditModalState);

  const getEditModal = (_id: string) => {
    setEdit(_id);
  };

  const columns: GridColDef[] = [
    { field: "title_az", headerName: "Başlıq AZ", width: 260 },
    { field: "title_en", headerName: "Başlıq EN", width: 260 },
    { field: "title_ru", headerName: "Başlıq RU", width: 260 },
    { field: "description_az", headerName: "Açıqlama AZ", width: 200 },
    { field: "description_en", headerName: "Açıqlama EN", width: 200 },
    { field: "description_ru", headerName: "Açıqlama RU", width: 200 },
    { field: "created_at", headerName: "Tarix", width: 200 },
    { field: "hours", headerName: "Saat", width: 200 },
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
    ? fetchData.map((data: DataTypeKaiyiNews) => ({
        id: data._id,
        title_az: data?.title?.az,
        title_en: data?.title?.en,
        title_ru: data?.title?.ru,
        description_az: data?.description?.az,
        description_en: data?.description?.en,
        description_ru: data?.description?.ru,
        created_at: data?.created_at,
        hours: data?.hours,
        status: data?.status,
      }))
    : [];

  //EDIT MODAL
  const EditModal: React.FC<Props> = (props) => {
    //states
    const [previewImg, setPreviewImg] = useState<string>(`https://kaiyi-21d4.onrender.com${props?.data?.image}`);
    const [image, setImage] = React.useState<File | null>(null);
    const [video, setVideo] = React.useState<File | null>(null);
    const [videoPreview, setVideoPreview] = React.useState<string>("");
    const [descriptionAz, setDescriptionAz] = React.useState<string>(props?.data?.description?.az || "");
    const [descriptionEn, setDescriptionEn] = React.useState<string>(props?.data?.description?.en || "");
    const [descriptionRu, setDescriptionRu] = React.useState<string>(props?.data?.description?.ru || "");
    const [titleAz, setTitleAz] = useState<string>(props?.data?.title?.az || "");
    const [titleEn, setTitleEn] = useState<string>(props?.data.title?.en || "");
    const [titleRu, setTitleRu] = useState<string>(props?.data.title?.ru || "");
    const [sloganAz, setSloganAz] = React.useState<string>("");
    const [sloganEn, setSloganEn] = React.useState<string>("");
    const [sloganRu, setSloganRu] = React.useState<string>("");
    const [selectedStatus, setSelectedStatus] = React.useState<string>("active");

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
      setPreviewImg(`https://kaiyi-21d4.onrender.com${props?.data?.image}`);
      setVideoPreview(props?.data?.video || "");
      setSelectedStatus(props?.data?.status || "active");
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

    const handleChangeVideo = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target && e.target.files) {
        const file = e.target.files[0];
        setVideo(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setVideoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    //edit
    const handleEdit = async (e: React.FormEvent, id: string) => {
      e.preventDefault();

      setLoading(true);

      const formData = new FormData();
      formData.append("video", video ? video : "");
      formData.append("img", image ? image : "");
      formData.append("title_az", titleAz);
      formData.append("title_en", titleEn);
      formData.append("title_ru", titleRu);
      formData.append("description_az", descriptionAz);
      formData.append("description_en", descriptionEn);
      formData.append("description_ru", descriptionRu);
      formData.append("slogan_az", sloganAz);
      formData.append("slogan_en", sloganEn);
      formData.append("slogan_ru", sloganRu);
      formData.append("created_at", moment().format("DD.MM.YYYY"));
      formData.append("hours", moment().format("HH:mm"));
      formData.append("status", selectedStatus);

      try {
        const response = await axios.put(`${endpoint}/kaiyi-history-news/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data) {
          toast.success("Əla! Uğurla əlavə edildi.", {
            position: "top-center",
          });
          window.location.reload();
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
              label="Yenilik Başlıq (AZ)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
            />
            <InputField
              label="Yenilik Başlıq (EN)"
              placeholder="Məsələn: Example data..."
              value={titleEn}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
            />
            <InputField
              label="Yenilik Başlıq (RU)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
              value={titleRu}
            />

            <InputField
              title="Məsələn, 'Sloqan' sizin yeniliklərin vəya hansısa kartın ümumi tanımlayan description / açıqlama ola bilər"
              placeholder="Məsələn, 'Sloqan' sizin yeniliklərin vəya hansısa kartın ümumi tanımlayan description / açıqlama ola bilər.."
              name="slogan_az"
              value={sloganAz}
              label="Sloqan (AZ)"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSloganAz(e.target.value)}
            />
            <InputField
              title="Məsələn, 'Sloqan' sizin yeniliklərin vəya hansısa kartın ümumi tanımlayan description / açıqlama ola bilər"
              placeholder="Məsələn, 'Sloqan' sizin yeniliklərin vəya hansısa kartın ümumi tanımlayan description / açıqlama ola bilər.."
              name="slogan_en"
              value={sloganEn}
              label="Sloqan (EN)"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSloganEn(e.target.value)}
            />
            <InputField
              title="Məsələn, 'Sloqan' sizin yeniliklərin vəya hansısa kartın ümumi tanımlayan description / açıqlama ola bilər"
              placeholder="Məsələn, 'Sloqan' sizin yeniliklərin vəya hansısa kartın ümumi tanımlayan description / açıqlama ola bilər.."
              name="slogan_ru"
              value={sloganRu}
              label="Sloaqan (RU)"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSloganRu(e.target.value)}
            />

            <div className="my-editor-component">
              <label>Açıqlama (AZ)</label>
              <MyEditor value={descriptionAz} handleChange={(html: string) => setDescriptionAz(html)} />
            </div>
            <div className="my-editor-component">
              <label>Açıqlama (EN)</label>
              <MyEditor value={descriptionEn} handleChange={(html: string) => setDescriptionEn(html)} />
            </div>
            <div className="my-editor-component">
              <label>Açıqlama (RU)</label>
              <MyEditor value={descriptionRu} handleChange={(html: string) => setDescriptionRu(html)} />
            </div>

            <InputImageField
              labelTitle="Video yüklə"
              req={false}
              onChange={handleChangeVideo}
              name="video"
              accepting={"video/*"}
            />
            {videoPreview && (
              <video
                src={videoPreview}
                controls={true}
                muted={false}
                autoPlay={false}
                style={{ maxWidth: "200px", marginTop: "10px" }}
              />
            )}
            <InputImageField req={false} onChange={handleUpdateImage} name="img" />
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
        fetchData.map((data: DataTypeKaiyiNews) => {
          if (edit === data?._id) {
            return <EditModal key={data?._id} data={data} />;
          }
          return null;
        })}
    </div>
  );
};

export default KaiyiNewsEdit;
