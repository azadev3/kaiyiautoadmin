import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "../../../recoil/atoms";
import { endpoint } from "../../../Baseurl";
import InputField from "../../../uitils/ui/InputField";
import InputImageField from "../../../uitils/ui/InputImageField";
import ButtonSubmit from "../../../uitils/ui/ButtonSubmit";
import { DataTypeModels } from "./ModelsShow";
import MyEditor from "../../../Tiptap";

const ModelsCreate: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [previewImg, setPreviewImg] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string>("");
  const [video, setVideo] = useState<File | null>(null);
  const [titleAz, setTitleAz] = useState<string>("");
  const [titleEn, setTitleEn] = useState<string>("");
  const [titleRu, setTitleRu] = useState<string>("");
  const [sloganAz, setSloganAz] = useState<string>("");
  const [sloganEn, setSloganEn] = useState<string>("");
  const [sloganRu, setSloganRu] = useState<string>("");
  const [descriptionAz, setDescriptionAz] = useState<string>("");
  const [descriptionEn, setDescriptionEn] = useState<string>("");
  const [descriptionRu, setDescriptionRu] = useState<string>("");

  const { refetch } = useQuery<DataTypeModels[]>({
    queryKey: ["fetchDataKeyModelsTab"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/modelstab`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    staleTime: 3000000,
  });

  //image
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImg(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  //video
  const handleChangeVideo = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      setVideo(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewVideo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title_az", titleAz);
    formData.append("title_en", titleEn);
    formData.append("title_ru", titleRu);
    formData.append("slogan_az", sloganAz);
    formData.append("slogan_en", sloganEn);
    formData.append("slogan_ru", sloganRu);
    formData.append("description_az", descriptionAz);
    formData.append("description_en", descriptionEn);
    formData.append("description_ru", descriptionRu);
    formData.append("img", image ? image : "");
    formData.append("video", video ? video : "");

    try {
      const response = await axios.post(`${endpoint}/modelstab`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data) {
        toast.success("Əla! Uğurla əlavə edildi.", {
          position: "top-center",
        });
        refetch();
        window.location.reload();
      } else {
        toast.error("Bir problem oldu.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Bir problem oldu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form acceptCharset="UTF-8" onSubmit={handleSubmit}>
      <InputField
        name="title_az"
        value={titleAz}
        label="Model Başlıq (AZ)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
      />
      <InputField
        name="title_en"
        value={titleEn}
        label="Model Başlıq (EN)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
      />
      <InputField
        name="title_ru"
        value={titleRu}
        label="Model Başlıq (RU)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
      />
      <InputField
        title="Məsələn, 'Sloqan' sizin bloqların vəya hansısa kartın ümumi tanımlayan description / açıqlama ola bilər"
        placeholder="Məsələn, 'Sloqan' sizin bloqların vəya hansısa kartın ümumi tanımlayan description / açıqlama ola bilər.."
        name="slogan_az"
        value={sloganAz}
        label="Sloqan (AZ)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSloganAz(e.target.value)}
      />
      <InputField
        title="Məsələn, 'Sloqan' sizin bloqların vəya hansısa kartın ümumi tanımlayan description / açıqlama ola bilər"
        placeholder="Məsələn, 'Sloqan' sizin bloqların vəya hansısa kartın ümumi tanımlayan description / açıqlama ola bilər.."
        name="slogan_en"
        value={sloganEn}
        label="Sloqan (EN)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSloganEn(e.target.value)}
      />
      <InputField
        title="Məsələn, 'Sloqan' sizin bloqların vəya hansısa kartın ümumi tanımlayan description / açıqlama ola bilər"
        placeholder="Məsələn, 'Sloqan' sizin bloqların vəya hansısa kartın ümumi tanımlayan description / açıqlama ola bilər.."
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

      <InputImageField onChange={handleChangeImage} name="img" />
      {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px" }} />}

      <InputImageField
        labelTitle="Video yüklə"
        req={true}
        accepting="video/*"
        onChange={handleChangeVideo}
        name="video"
      />
      {previewVideo && <video src={previewVideo} controls style={{ maxWidth: "200px" }} />}

      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default ModelsCreate;
