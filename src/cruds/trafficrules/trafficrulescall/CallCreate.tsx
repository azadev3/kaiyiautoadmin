import React, { ChangeEvent } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "../../../recoil/atoms";
import { endpoint } from "../../../Baseurl";
import InputField from "../../../uitils/ui/InputField";
import ButtonSubmit from "../../../uitils/ui/ButtonSubmit";
import { DataTypeTrafficRulesCall } from "./CallShow";

const CallCreate: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [titleAz, setTitleAz] = React.useState<string>("");
  const [titleEn, setTitleEn] = React.useState<string>("");
  const [titleRu, setTitleRu] = React.useState<string>("");
  const [descriptionAz, setDescriptionAz] = React.useState<string>("");
  const [descriptionEn, setDescriptionEn] = React.useState<string>("");
  const [descriptionRu, setDescriptionRu] = React.useState<string>("");
  const [miniTitleAz, setMiniTitleAz] = React.useState<string>("");
  const [miniTitleEn, setMiniTitleEn] = React.useState<string>("");
  const [miniTitleRu, setMiniTitleRu] = React.useState<string>("");
  const [telephone, setTelephone] = React.useState<string>("");

  const { refetch } = useQuery<DataTypeTrafficRulesCall[]>({
    queryKey: ["fetchDataKeyTrafficRulesCall"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/traffic-rules-call`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    staleTime: 3000000,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("title_az", titleAz);
    formData.append("title_en", titleEn);
    formData.append("title_ru", titleRu);
    formData.append("description_az", descriptionAz);
    formData.append("description_en", descriptionEn);
    formData.append("description_ru", descriptionRu);
    formData.append("miniTitleAz", miniTitleAz);
    formData.append("miniTitleEn", miniTitleEn);
    formData.append("miniTitleRu", miniTitleRu);
    formData.append("telephone", telephone);

    try {
      const response = await axios.post(`${endpoint}/traffic-rules-call`, formData, {
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
        setMiniTitleAz("");
        setMiniTitleEn("");
        setMiniTitleRu("");
        setTelephone("");
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
        label="Yol Qaydaları - Yardım və Zəng Başlıq (AZ)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
      />
      <InputField
        label="Yol Qaydaları - Yardım və Zəng Başlıq (EN)"
        placeholder="Məsələn: Example data..."
        value={titleEn}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
      />
      <InputField
        label="Yol Qaydaları - Yardım və Zəng Başlıq (RU)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
        value={titleRu}
      />
      <InputField
        label="Yol Qaydaları - Yardım və Zəng Açıqlama (AZ) (maksimum: 80 hərf)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionAz(e.target.value)}
        value={descriptionAz}
        maxLength={80}
      />
      <InputField
        label="Yol Qaydaları - Yardım və Zəng Açıqlama (EN) (maksimum: 80 hərf)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionEn(e.target.value)}
        value={descriptionEn}
        maxLength={80}
      />
      <InputField
        label="Yol Qaydaları - Yardım və Zəng Açıqlama (RU) (maksimum: 80 hərf)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionRu(e.target.value)}
        value={descriptionRu}
        maxLength={80}
      />

      <InputField
        label="Yol Qaydaları - Mini Başlıq (AZ)"
        placeholder="Məsələn: Help and advice for KAIYI cars by phone"
        value={miniTitleAz}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setMiniTitleAz(e.target.value)}
      />

      <InputField
        label="Yol Qaydaları - Mini Başlıq (EN)"
        placeholder="Məsələn: Help and advice for KAIYI cars by phone"
        value={miniTitleAz}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setMiniTitleEn(e.target.value)}
      />

      <InputField
        label="Yol Qaydaları - Mini Başlıq (RU)"
        placeholder="Məsələn: Help and advice for KAIYI cars by phone"
        value={miniTitleAz}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setMiniTitleRu(e.target.value)}
      />

      <InputField
        label="Yol Qaydaları - Telefon nömrəniz"
        placeholder="Məsələn: +994703330000"
        value={telephone}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTelephone(e.target.value)}
      />

      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default CallCreate;
