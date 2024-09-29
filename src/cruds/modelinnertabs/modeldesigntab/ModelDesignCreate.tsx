import React, { ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { endpoint } from "../../../Baseurl";
import InputImageField from "../../../uitils/ui/InputImageField";
import ButtonSubmit from "../../../uitils/ui/ButtonSubmit";
import InputField from "../../../uitils/ui/InputField";
import { useRecoilState } from "recoil";
import { LoadingState } from "../../../recoil/atoms";
import { DataTypeModelDesignTab } from "./ModelDesignShow";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import Select from "react-select";

const ModelDesignCreate: React.FC = () => {
  //for selected model inner contents
  const { data } = useQuery<[]>({
    queryKey: ["fetchDataModelsAll", "az"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/modelstabfront`, {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "az",
        },
      });
      return response.data;
    },
  });

  //extract for models options
  const models =
    data &&
    data?.map((data: any) => ({
      value: data?._id,
      label: data?.title,
    }));

  const [loading, setLoading] = useRecoilState(LoadingState);
  const [titleAz, setTitleAz] = React.useState<string>("");
  const [titleEn, setTitleEn] = React.useState<string>("");
  const [titleRu, setTitleRu] = React.useState<string>("");
  const [descriptionAz, setDescriptionAz] = React.useState<string>("");
  const [descriptionEn, setDescriptionEn] = React.useState<string>("");
  const [descriptionRu, setDescriptionRu] = React.useState<string>("");
  const [color, setColor] = useColor("");
  const [previewImg, setPreviewImg] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);
  const [selectedModel, setSelectedModel] = React.useState<string | null>(null);

  const { refetch } = useQuery<DataTypeModelDesignTab[]>({
    queryKey: ["fetchDataModelDesignKey"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/modeldesigntab`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
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
    formData.append("titleAz", titleAz);
    formData.append("titleEn", titleEn);
    formData.append("titleRu", titleRu);
    formData.append("descriptionAz", descriptionAz);
    formData.append("descriptionEn", descriptionEn);
    formData.append("descriptionRu", descriptionRu);
    formData.append("color", color.hex);
    formData.append("img", image ? image : "");
    formData.append("selected_model", selectedModel ? selectedModel : "");

    try {
      const response = await axios.post(`${endpoint}/modeldesigntab`, formData, {
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
        setColor(color);
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
        label="Dizayn Tab Hissə Başlıq (AZ)"
        placeholder="Məsələn: Example data..."
        required={true}
        name="titleAz"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
      />
      <InputField
        label="Dizayn Tab Hissə Başlıq (EN)"
        placeholder="Məsələn: Example data..."
        value={titleEn}
        required={true}
        name="titleEn"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
      />
      <InputField
        label="Dizayn Tab Hissə Başlıq (RU)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
        value={titleRu}
        required={true}
        name="titleRu"
      />
      <InputField
        label="Dizayn Tab Hissə Açıqlama (AZ) (maksimum: 80 hərf)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionAz(e.target.value)}
        value={descriptionAz}
        maxLength={80}
      />
      <InputField
        label="Dizayn Tab Hissə Açıqlama (EN) (maksimum: 80 hərf)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionEn(e.target.value)}
        value={descriptionEn}
        maxLength={80}
      />
      <InputField
        label="Dizayn Tab Hissə Açıqlama (RU) (maksimum: 80 hərf)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionRu(e.target.value)}
        value={descriptionRu}
        maxLength={80}
      />

      <div className="input-field">
        <label htmlFor="">Rəng seçin</label>
        <ColorPicker height={100} color={color} onChange={setColor} />
        <h3 style={{ fontWeight: "600", fontSize: "24px" }}>{color.hex || ""}</h3>
      </div>

      <Select
        value={models?.find((option) => option?.value === selectedModel)}
        onChange={(selectedOption) => {
          setSelectedModel(selectedOption?.value);
        }}
        options={models}
        isSearchable={true}
        required
        name="selected_model"
        placeholder="Bu video hansı model içərisində göstərilsin? Seçin..."
      />

      <InputImageField
        onChange={handleChange}
        name="img"
        labelTitle="Qeyd etdiyiniz rəngə uyğun model şəklini yerləşdirin"
      />
      {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default ModelDesignCreate;
