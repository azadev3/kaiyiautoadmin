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
import { DataTypeKaiyiHistoryBottom } from "./KaiyiHistoryBottomShow";

const KaiyiHistoryBottomCreate: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [previewImg, setPreviewImg] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);

  const [titleAz, setTitleAz] = React.useState<string>("");
  const [titleEn, setTitleEn] = React.useState<string>("");
  const [titleRu, setTitleRu] = React.useState<string>("");
  const [descriptionAz, setDescriptionAz] = React.useState<string>("");
  const [descriptionEn, setDescriptionEn] = React.useState<string>("");
  const [descriptionRu, setDescriptionRu] = React.useState<string>("");
  const [year, setYear] = React.useState<string>("");

  const { refetch } = useQuery<DataTypeKaiyiHistoryBottom[]>({
    queryKey: ["fetchDataKeyKaiyiHistoryBottom"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/kaiyi-history-bottom`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    staleTime: 3000000,
  });

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
    formData.append("title_az", titleAz);
    formData.append("title_en", titleEn);
    formData.append("title_ru", titleRu);
    formData.append("description_az", descriptionAz);
    formData.append("description_en", descriptionEn);
    formData.append("description_ru", descriptionRu);
    formData.append("year", year);

    try {
      const response = await axios.post(`${endpoint}/kaiyi-history-bottom`, formData, {
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
        setPreviewImg("");
        setYear("");
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
        label="EY KAIYI - Aşağı hissə Açıqlama Başlıq (AZ)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
      />
      <InputField
        label="EY KAIYI - Aşağı hissə Açıqlama Başlıq (EN)"
        placeholder="Məsələn: Example data..."
        value={titleEn}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
      />
      <InputField
        label="EY KAIYI - Aşağı hissə Açıqlama Başlıq (RU)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
        value={titleRu}
      />
      <InputField
        label="EY KAIYI - Aşağı hissə Açıqlama (AZ)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionAz(e.target.value)}
        value={descriptionAz}
      />
      <InputField
        label="EY KAIYI - Aşağı hissə Açıqlama (EN)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionEn(e.target.value)}
        value={descriptionEn}
      />
      <InputField
        label="EY KAIYI - Aşağı hissə Açıqlama (RU)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionRu(e.target.value)}
        value={descriptionRu}
      />
      <InputField
        type="text"
        value={year}
        name="year"
        label="EY KAIYI - Aşağı hissə İl"
        placeholder="Məsələn: 2024"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
      />

      <InputImageField req={true} onChange={handleChange} name="img" />
      {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default KaiyiHistoryBottomCreate;
