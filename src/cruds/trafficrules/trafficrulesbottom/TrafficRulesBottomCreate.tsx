import React, { ChangeEvent } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "../../../recoil/atoms";
import { endpoint } from "../../../Baseurl";
import InputImageField from "../../../uitils/ui/InputImageField";
import ButtonSubmit from "../../../uitils/ui/ButtonSubmit";
import { DataTypeTrafficRulesBottom } from "./TrafficRulesBottomShow";
import MyEditor from "../../../Tiptap";

const TrafficRulesBottomCreate: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [previewImg, setPreviewImg] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);

  const [descriptionAz, setDescriptionAz] = React.useState<string>("");
  const [descriptionEn, setDescriptionEn] = React.useState<string>("");
  const [descriptionRu, setDescriptionRu] = React.useState<string>("");

  const { refetch } = useQuery<DataTypeTrafficRulesBottom[]>({
    queryKey: ["fetchDataKeyTrafficRulesBottom"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/traffic-rules-bottom`, {
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
    formData.append("description_az", descriptionAz);
    formData.append("description_en", descriptionEn);
    formData.append("description_ru", descriptionRu);

    try {
      const response = await axios.post(`${endpoint}/traffic-rules-bottom`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        toast.success("Əla! Uğurla əlavə edildi.", {
          position: "top-center",
        });
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

      <InputImageField req={true} onChange={handleChange} name="img" />
      {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default TrafficRulesBottomCreate;
