import React, { ChangeEvent } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import InputField from "../../../uitils/ui/InputField";
import { LoadingState } from "../../../recoil/atoms";
import { endpoint } from "../../../Baseurl";
import InputImageField from "../../../uitils/ui/InputImageField";
import ButtonSubmit from "../../../uitils/ui/ButtonSubmit";
import moment from "moment";
import MyEditor from "../../../Tiptap";
import { DataTypeKaiyiNews } from "./KaiyiNewsShow";

const KaiyiNewsCreate: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [previewImg, setPreviewImg] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);
  const [video, setVideo] = React.useState<File | null>(null);
  const [videoPreview, setVideoPreview] = React.useState<string>("");
  const [titleAz, setTitleAz] = React.useState<string>("");
  const [titleEn, setTitleEn] = React.useState<string>("");
  const [titleRu, setTitleRu] = React.useState<string>("");
  const [descriptionAz, setDescriptionAz] = React.useState<string>("");
  const [descriptionEn, setDescriptionEn] = React.useState<string>("");
  const [descriptionRu, setDescriptionRu] = React.useState<string>("");
  const [sloganAz, setSloganAz] = React.useState<string>("");
  const [sloganEn, setSloganEn] = React.useState<string>("");
  const [sloganRu, setSloganRu] = React.useState<string>("");

  const { refetch } = useQuery<DataTypeKaiyiNews[]>({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("img", image ? image : "");
    formData.append("video", video ? video : "");
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

    try {
      const response = await axios.post(`${endpoint}/kaiyi-history-news`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        toast.success("Əla! Uğurla əlavə edildi.", {
          position: "top-center",
        });
        setTitleAz("");
        setTitleEn("");
        setTitleRu("");
        setDescriptionAz("");
        setDescriptionEn("");
        setDescriptionRu("");
        setSloganAz("");
        setSloganEn("");
        setSloganRu("");
        setPreviewImg("");
        setVideoPreview("");
        window.location.reload();
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
    <form acceptCharset="UTF-8" onSubmit={handleSubmit}>
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

      <InputImageField labelTitle="Şəkil yüklə" req={false} onChange={handleChange} name="img" />
      {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default KaiyiNewsCreate;
