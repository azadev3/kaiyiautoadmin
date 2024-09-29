import React, { ChangeEvent } from "react";
import InputField from "../../uitils/ui/InputField";
import { BiPlus } from "react-icons/bi";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import InputImageField from "../../uitils/ui/InputImageField";
import ButtonSubmit from "../../uitils/ui/ButtonSubmit";
import { useRecoilState } from "recoil";
import { LoadingState } from "../../recoil/atoms";
import axios from "axios";
import { endpoint } from "../../Baseurl";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { OurAdvantagesType } from "./OurAdvantagesShow";

interface NavContent {
  id: string;
  titleAz: string;
  titleEn: string;
  titleRu: string;
  descriptionAz: string;
  descriptionEn: string;
  descriptionRu: string;
  icon: any;
}

const OurAdvantagesCreate: React.FC = () => {
  const { refetch } = useQuery<OurAdvantagesType[]>({
    queryKey: ["fetchDataKeyOurAdvantages"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/ouradvantages`);
      return response.data;
    },
    staleTime: 3000000,
  });

  const [loading, setLoading] = useRecoilState(LoadingState);
  const [navTitleAz, setNavTitleAz] = React.useState<string>("");
  const [navTitleEn, setNavTitleEn] = React.useState<string>("");
  const [navTitleRu, setNavTitleRu] = React.useState<string>("");
  const [formNavContent, setFormNavContent] = React.useState<NavContent[]>([]);

  const handleAddNavContent = () => {
    setFormNavContent((prev) => [
      ...prev,
      {
        titleAz: "",
        titleEn: "",
        titleRu: "",
        descriptionAz: "",
        descriptionEn: "",
        descriptionRu: "",
        icon: "",
        id: uuidv4(),
      },
    ]);
  };

  const deleteContent = (id: string) => {
    setFormNavContent((prevContent) => prevContent.filter((item) => item.id !== id));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number, field: string) => {
    const updatedNavContent: any = [...formNavContent];
    updatedNavContent[index][field] = e.target.value;
    setFormNavContent(updatedNavContent);
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const updatedContent = [...formNavContent];
      updatedContent[index].icon = files[0];
      setFormNavContent(updatedContent);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("navTitleAz", navTitleAz);
      formData.append("navTitleEn", navTitleEn);
      formData.append("navTitleRu", navTitleRu);
      formNavContent?.forEach((datas: NavContent, index: number) => {
        formData.append(`content[${index}][titleAz]`, datas.titleAz);
        formData.append(`content[${index}][titleEn]`, datas.titleEn);
        formData.append(`content[${index}][titleRu]`, datas.titleRu);
        formData.append(`content[${index}][descriptionAz]`, datas.descriptionAz);
        formData.append(`content[${index}][descriptionEn]`, datas.descriptionEn);
        formData.append(`content[${index}][descriptionRu]`, datas.descriptionRu);
        // if (datas.icon) {
        //   formData.append(`content[${index}][icon]`, datas.icon);
        // }
      });

      const response = await axios.post(`${endpoint}/ouradvantages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        toast.success("Əla! Uğurla əlavə edildi.", {
          position: "top-center",
        });
        setNavTitleAz("");
        setNavTitleEn("");
        setNavTitleRu("");
        setFormNavContent((prev) => [
          ...prev,
          {
            titleAz: "",
            descriptionAz: "",
            descriptionEn: "",
            descriptionRu: "",
            icon: "",
            titleEn: "",
            titleRu: "",
            id: "",
          },
        ]);
        refetch();
        console.log(response.data);
      } else {
        toast.error("Bir problem oldu.", {
          position: "top-center",
        });
        console.log(response.status);
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
    <form acceptCharset="UTF-8" onSubmit={handleSubmit} encType="multipart/form-data">
      <InputField
        label="Nav Başlıq (AZ)"
        placeholder="Burada naviqasiya hissənin başlığı olacaq"
        required
        name="navTitleAz"
        value={navTitleAz}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNavTitleAz(e.target.value)}
      />
      <InputField
        label="Nav Başlıq (EN)"
        placeholder="Burada naviqasiya hissənin başlığı olacaq"
        required
        name="navTitleEn"
        value={navTitleEn}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNavTitleEn(e.target.value)}
      />
      <InputField
        label="Nav Başlıq (RU)"
        placeholder="Burada naviqasiya hissənin başlığı olacaq"
        required
        name="navTitleRu"
        value={navTitleRu}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNavTitleRu(e.target.value)}
      />

      {formNavContent.map((fields: NavContent, index: number) => (
        <div className="contentarea" key={fields.id}>
          <div className="top">
            <h1>
              Kontent {index + 1} ({fields.id})
            </h1>
            <div className="removed" onClick={() => deleteContent(fields.id)}>
              <span>Bu kontenti qaldır</span>
              <MdOutlineRemoveCircleOutline className="remove" />
            </div>
          </div>
          <InputField
            label="Kontent Başlıq (AZ)"
            name="titleAz"
            value={fields.titleAz}
            onChange={(e) => handleChange(e, index, "titleAz")}
          />
          <InputField
            label="Kontent Başlıq (EN)"
            name="titleEn"
            value={fields.titleEn}
            onChange={(e) => handleChange(e, index, "titleEn")}
          />
          <InputField
            label="Kontent Başlıq (RU)"
            name="titleRu"
            value={fields.titleRu}
            onChange={(e) => handleChange(e, index, "titleRu")}
          />
          <InputField
            label="Kontent Açıqlama (AZ) max (80)"
            maxLength={80}
            name="descriptionAz"
            value={fields.descriptionAz}
            onChange={(e) => handleChange(e, index, "descriptionAz")}
          />
          <InputField
            label="Kontent Açıqlama (EN) max (80)"
            maxLength={80}
            name="descriptionEn"
            value={fields.descriptionEn}
            onChange={(e) => handleChange(e, index, "descriptionEn")}
          />
          <InputField
            label="Kontent Açıqlama (RU) max (80)"
            maxLength={80}
            name="descriptionRu"
            value={fields.descriptionRu}
            onChange={(e) => handleChange(e, index, "descriptionRu")}
          />
          <InputImageField
            multiple
            accepting="image/*"
            name="icon"
            labelTitle="Kontentə aid ikon yüklə"
            req={true}
            onChange={(e) => handleIconChange(e, index)}
          />
        </div>
      ))}

      <div className="add-content-btn" onClick={handleAddNavContent}>
        <BiPlus className="plus-icon" />
        <span>Kontent əlavə et</span>
      </div>

      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default OurAdvantagesCreate;
