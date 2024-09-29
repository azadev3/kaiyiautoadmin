import React, { ChangeEvent } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "../../../recoil/atoms";
import { endpoint } from "../../../Baseurl";
import InputField from "../../../uitils/ui/InputField";
import InputImageField from "../../../uitils/ui/InputImageField";
import ButtonSubmit from "../../../uitils/ui/ButtonSubmit";
import { DataTypeComfortable } from "./ComfortableShow";

const ComfortableCreate: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [previewImg, setPreviewImg] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);
  const [previewVideo, setPreviewVideo] = React.useState<string>("");
  const [video, setVideo] = React.useState<File | null>(null);

  const [titleAz, setTitleAz] = React.useState<string>("");
  const [titleEn, setTitleEn] = React.useState<string>("");
  const [titleRu, setTitleRu] = React.useState<string>("");
  const [descriptionAz, setDescriptionAz] = React.useState<string>("");
  const [descriptionEn, setDescriptionEn] = React.useState<string>("");
  const [descriptionRu, setDescriptionRu] = React.useState<string>("");
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };
  const { refetch } = useQuery<DataTypeComfortable[]>({
    queryKey: ["fetchDataKeyComfortableTab"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/comfortabletab`, {
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

  const handleChangevideo = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      setVideo(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewVideo(reader.result as string);
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
    formData.append("video", video ? video : "");
    formData.append("title_az", titleAz);
    formData.append("title_en", titleEn);
    formData.append("title_ru", titleRu);
    formData.append("description_az", descriptionAz);
    formData.append("description_en", descriptionEn);
    formData.append("description_ru", descriptionRu);
    formData.append("selected_option", selectedOption ? selectedOption : "");
    
    try {
      const response = await axios.post(`${endpoint}/comfortabletab`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
        label="Comfortable Başlıq (AZ)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
      />
      <InputField
        label="Comfortable Başlıq (EN)"
        placeholder="Məsələn: Example data..."
        value={titleEn}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
      />
      <InputField
        label="Comfortable Başlıq (RU)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
        value={titleRu}
      />
      <InputField
        label="Açıqlama (AZ)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionAz(e.target.value)}
        value={descriptionAz}
        maxLength={80}
      />
      <InputField
        label="Açıqlama (EN)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionEn(e.target.value)}
        value={descriptionEn}
        maxLength={80}
      />
      <InputField
        label="Açıqlama (RU)"
        placeholder="Məsələn: Example data..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionRu(e.target.value)}
        value={descriptionRu}
        maxLength={80}
      />

      <InputImageField onChange={handleChange} name="img" />
      {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}

      <InputImageField accepting="video/*" req={true} labelTitle="Video yüklə" onChange={handleChangevideo} name="video" />
      {previewVideo && <video src={previewVideo} controls={true} muted={false} autoPlay={false} style={{ maxWidth: "200px", marginTop: "10px" }} />}

      <div className="selected-item">
        <div className="label-radio">
          <label>
            <input required name="mediatype" type="radio" value="isVideo" onChange={handleRadioChange} checked={selectedOption === "isVideo"} />
            <span>Video olsun</span>
          </label>
        </div>
        <div className="label-radio">
          <label>
            <input required name="mediatype" type="radio" value="isImage" onChange={handleRadioChange} checked={selectedOption === "isImage"} />
            <span>Şəkil olsun</span>
          </label>
        </div>
      </div>

      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default ComfortableCreate;
