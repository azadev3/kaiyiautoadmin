import React, { ChangeEvent } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "../../recoil/atoms";
import { endpoint } from "../../Baseurl";
import InputField from "../../uitils/ui/InputField";
import InputImageField from "../../uitils/ui/InputImageField";
import ButtonSubmit from "../../uitils/ui/ButtonSubmit";
import { DataTypeRepairRulesDownload } from "./RepairRulesDownloadShow";

const RepairRulesDownloadCreate: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [previewImg, setPreviewImg] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);

  const [titleAz, setTitleAz] = React.useState<string>("");
  const [titleEn, setTitleEn] = React.useState<string>("");
  const [titleRu, setTitleRu] = React.useState<string>("");

  const [pdf, setPdf] = React.useState<File | null>(null);

  const { refetch } = useQuery<DataTypeRepairRulesDownload[]>({
    queryKey: ["fetchDataKeyRepairRulesDownload"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/repair-rules-download`, {
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

  // upload PDF file
  const handleUploadPdf = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPdf(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!pdf || !image) {
      toast.warning("Xana və ya xanalar boş olmamalıdır.", {
        position: "top-center",
      });
      return;
    }

    const formData = new FormData();

    if (image) {
      formData.append("img", image);
    }

    if (pdf) {
      formData.append("pdf", pdf);
    }

    formData.append("title_az", titleAz);
    formData.append("title_en", titleEn);
    formData.append("title_ru", titleRu);

    try {
      const response = await axios.post(`${endpoint}/repair-rules-download`, formData, {
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
        window.location.reload();
        refetch();
      } else {
        toast.error("Bir problem oldu.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Bir problem oldu.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form acceptCharset="UTF-8" onSubmit={handleSubmit}>
      <InputField
        value={titleAz}
        required
        name="title_az"
        label="Təmir və Baxım - Baxım qaydaları Başlıq (AZ)*"
        placeholder="Məsələn: PETROL 1.5T, 6MT BACK"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
      />
      <InputField
        required
        name="title_en"
        label="Təmir və Baxım - Baxım qaydaları Başlıq (EN)*"
        placeholder="Məsələn: PETROL 1.5T, 6MT BACK"
        value={titleEn}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
      />
      <InputField
        required
        name="title_ru"
        label="Təmir və Baxım - Baxım qaydaları Başlıq (RU)*"
        placeholder="Məsələn: PETROL 1.5T, 6MT BACK"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
        value={titleRu}
      />

      <InputImageField labelTitle="Qaydaya ait şəkil yükləyin*" req={false} onChange={handleChange} name="img" />
      {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
      <InputImageField
        accepting={".pdf, .doc, .docx"}
        labelTitle="Qaydaya ait PDF - DOC - DOCX *"
        req={false}
        onChange={handleUploadPdf}
        name="pdf"
      />

      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default RepairRulesDownloadCreate;
