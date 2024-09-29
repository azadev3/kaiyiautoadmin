import React from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "../../../recoil/atoms";
import { endpoint } from "../../../Baseurl";
import ButtonSubmit from "../../../uitils/ui/ButtonSubmit";
import { DataTypeGuarantAttention } from "./GuarantAttentionShow";
import MyEditor from "../../../Tiptap";

const GuarantAttentionCreate: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [descriptionAz, setDescriptionAz] = React.useState<string>("");
  const [descriptionEn, setDescriptionEn] = React.useState<string>("");
  const [descriptionRu, setDescriptionRu] = React.useState<string>("");

  const { refetch } = useQuery<DataTypeGuarantAttention[]>({
    queryKey: ["fetchDataKeyGuarantAttention"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/guarantattention`, {
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
    formData.append("description_az", descriptionAz);
    formData.append("description_en", descriptionEn);
    formData.append("description_ru", descriptionRu);

    try {
      const response = await axios.post(`${endpoint}/guarantattention`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        toast.success("Əla! Uğurla əlavə edildi.", {
          position: "top-center",
        });
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
      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default GuarantAttentionCreate;
