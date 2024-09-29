import React, { ChangeEvent } from "react";
import ButtonSubmit from "../../uitils/ui/ButtonSubmit";
import axios from "axios";
import { endpoint } from "../../Baseurl";
import { useRecoilState } from "recoil";
import { LoadingState } from "../../recoil/atoms";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import InputField from "../../uitils/ui/InputField";
import { DataTypeTranslate } from "./TranslatesShow";

const TranslatesCreate: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [key, setKey] = React.useState<string>("");
  const [azTitle, setAzTitle] = React.useState<string>("");
  const [enTitle, setEnTitle] = React.useState<string>("");
  const [ruTitle, setRuTitle] = React.useState<string>("");

  const { refetch } = useQuery<DataTypeTranslate[]>({
    queryKey: ["fetchDataKeyTranslates"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/translates`, {
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

    if (!key || !azTitle || !enTitle || !ruTitle) {
      toast.error("Bütün alanlar dolmalıdır!", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }

    const data = {
      key: key,
      azTitle: azTitle,
      enTitle: enTitle,
      ruTitle: ruTitle,
    };

    try {
      const response = await axios.post(`${endpoint}/translates`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        toast.success("Əla! Uğurla əlavə edildi.", {
          position: "top-center",
        });
        setKey("");
        setAzTitle("");
        setEnTitle("");
        setRuTitle("");
        refetch();
      } else {
        toast.error("Bir problem oldu.", {
          position: "top-center",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.warning("Görünür ki, eyni KEYi birdən çox istifadə etməyə çalışırsınız... Bu qadağandır!", {
            position: "top-center",
          });
        } else {
          toast.error("Bir problem oldu.", {
            position: "top-center",
          });
        }
      }
      console.error("Error 3:", error);
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
        label="Tərcümələr - KEY dəyəri"
        placeholder="Məsələn: about_title_key - keylər bənzərsiz olmalıdır*"
        value={key}
        name="key"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setKey(e.target.value)}
      />
      <InputField
        label="Tərcümələr - AZƏRBAYCANCA SÖZ"
        placeholder="Məsələn: Haqqımızda"
        value={azTitle}
        name="az_title"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setAzTitle(e.target.value)}
      />
      <InputField
        label="Tərcümələr - İNGİLİSCƏ SÖZ"
        placeholder="Məsələn: About us"
        value={enTitle}
        name="en_title"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEnTitle(e.target.value)}
      />
      <InputField
        label="Tərcümələr - RUSCA SÖZ"
        placeholder="Məsələn: О нас"
        value={ruTitle}
        name="ru_title"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setRuTitle(e.target.value)}
      />
      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default TranslatesCreate;
