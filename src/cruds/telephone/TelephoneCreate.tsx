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
import { DataTypeTelephone } from "./TelephoneShow";

const TelephoneCreate: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [previewImg, setPreviewImg] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);

  const [titleAz, setTitleAz] = React.useState<string>("");
  const [titleEn, setTitleEn] = React.useState<string>("");
  const [titleRu, setTitleRu] = React.useState<string>("");
  const [telephone, setTelephone] = React.useState<string>("");

  const { refetch } = useQuery<DataTypeTelephone[]>({
    queryKey: ["fetchDataKeyTelephone"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/telephone`, {
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

    if (!image) {
      toast.warning("Xana və ya xanalar boş olmamalıdır.", {
        position: "top-center",
      });
      return;
    }

    const formData = new FormData();
    formData.append("img", image);
    formData.append("title_az", titleAz);
    formData.append("title_en", titleEn);
    formData.append("title_ru", titleRu);
    formData.append("telephone", telephone);

    try {
      const response = await axios.post(`${endpoint}/telephone`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        toast.success("Əla! Uğurla əlavə edildi.", {
          position: "top-center",
        });
        setPreviewImg("");
        setImage(null);
        refetch();
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
    <form acceptCharset="UTF-8" onSubmit={handleSubmit}>
      <InputField
        value={titleAz}
        label="Telefon Başlıq (AZ)"
        placeholder="Məsələn: Qaynar xəttt"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
      />
      <InputField
        label="Telefon Başlıq (EN)"
        placeholder="Məsələn: Qaynar xəttt"
        value={titleEn}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
      />
      <InputField
        label="Telefon Başlıq (RU)"
        placeholder="Məsələn: Qaynar xəttt"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
        value={titleRu}
      />
      <InputField
        label="Telefon nömrəsi"
        type="number"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTelephone(e.target.value)}
        value={telephone}
      />

      <InputImageField onChange={handleChange} name="img" />

      {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}

      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default TelephoneCreate;
