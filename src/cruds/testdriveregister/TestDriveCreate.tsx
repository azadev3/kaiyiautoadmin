import React, { ChangeEvent } from "react";
import InputImageField from "../../uitils/ui/InputImageField";
import ButtonSubmit from "../../uitils/ui/ButtonSubmit";
import axios from "axios";
import { endpoint } from "../../Baseurl";
import { useRecoilState } from "recoil";
import { LoadingState } from "../../recoil/atoms";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import InputField from "../../uitils/ui/InputField";
import { DataTypeTestDrive } from "./TestDriveShow";

const TestDriveCreate: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [previewImg, setPreviewImg] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);

  const [titleAz, setTitleAz] = React.useState<string>("");
  const [titleEn, setTitleEn] = React.useState<string>("");
  const [titleRu, setTitleRu] = React.useState<string>("");
  const [descriptionAz, setDescriptionAz] = React.useState<string>("");
  const [descriptionEn, setDescriptionEn] = React.useState<string>("");
  const [descriptionRu, setDescriptionRu] = React.useState<string>("");

  const { refetch } = useQuery<DataTypeTestDrive[]>({
    queryKey: ["fetchDataKeyTestDrive"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/testdrive`, {
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

    try {
      const response = await axios.post(`${endpoint}/testdrive`, formData, {
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
        label="Test Sürüşü Qeydiyyat səhifəsi Hero Başlıq (AZ)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
      />
      <InputField
        label="Test Sürüşü Qeydiyyat səhifəsi Hero Başlıq (EN)"
        placeholder="Məsələn: Example data..."
        value={titleEn}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
      />
      <InputField
        label="Test Sürüşü Qeydiyyat səhifəsi Hero Başlıq (RU)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
        value={titleRu}
      />
      <InputField
        label="Test Sürüşü Qeydiyyat səhifəsi Hero Açıqlama (AZ) (maksimum: 80 hərf)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionAz(e.target.value)}
        value={descriptionAz}
        maxLength={80}
      />
      <InputField
        label="Test Sürüşü Qeydiyyat səhifəsi Hero Açıqlama (EN) (maksimum: 80 hərf)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionEn(e.target.value)}
        value={descriptionEn}
        maxLength={80}
      />
      <InputField
        label="Test Sürüşü Qeydiyyat səhifəsi Hero Açıqlama (RU) (maksimum: 80 hərf)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionRu(e.target.value)}
        value={descriptionRu}
        maxLength={80}
      />

      <InputImageField req={true} onChange={handleChange} name="img" />
      {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default TestDriveCreate;
