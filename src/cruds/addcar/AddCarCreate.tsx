import React, { ChangeEvent } from "react";
import ButtonSubmit from "../../uitils/ui/ButtonSubmit";
import axios from "axios";
import { endpoint } from "../../Baseurl";
import { useRecoilState } from "recoil";
import { LoadingState } from "../../recoil/atoms";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import InputField from "../../uitils/ui/InputField";
import { DataTypeCar } from "./AddCarShow";
import InputImageField from "../../uitils/ui/InputImageField";
import Select from "react-select";

const AddCarCreate: React.FC = () => {
  //for selected model inner cars
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

  const { refetch } = useQuery<DataTypeCar[]>({
    queryKey: ["fetchDataKeyAddCar"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/add-car`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    },
    staleTime: 3000000,
  });

  const [loading, setLoading] = useRecoilState(LoadingState);
  const [titleAz, setTitleAz] = React.useState<string>("");
  const [titleEn, setTitleEn] = React.useState<string>("");
  const [titleRu, setTitleRu] = React.useState<string>("");

  const [year, setYear] = React.useState<string>("");
  const [vin, setVin] = React.useState<string>("");

  const [inStockAz, setInStockAz] = React.useState<string>("");
  const [inStockEn, setInStockEn] = React.useState<string>("");
  const [inStockRu, setInStockRu] = React.useState<string>("");

  const [price, setPrice] = React.useState<string>("");
  const [companyTitleAz, setCompanyTitleAz] = React.useState<string>("");
  const [companyTitleEn, setCompanyTitleEn] = React.useState<string>("");
  const [companyTitleRu, setCompanyTitleRu] = React.useState<string>("");

  const [previewImg, setPreviewImg] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);

  const [miniDescAz, setMiniDescAz] = React.useState<string>("");
  const [miniDescEn, setMiniDescEn] = React.useState<string>("");
  const [miniDescRu, setMiniDescRu] = React.useState<string>("");

  const [selectedModel, setSelectedModel] = React.useState<string>("");

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

    if (!image || !titleAz || !titleEn || !titleRu || !price || !inStockAz || !inStockEn || !inStockRu) {
      toast.warning("Başlıqlar, şəkil və qiymət boş ola bilməz.", {
        position: "top-center",
      });
    }

    const formData = new FormData();
    formData.append("titleAz", titleAz);
    formData.append("titleEn", titleEn);
    formData.append("titleRu", titleRu);

    formData.append("img", image ? image : "");
    formData.append("year", year);
    formData.append("vin", vin);

    formData.append("inStockAz", inStockAz);
    formData.append("inStockEn", inStockEn);
    formData.append("inStockRu", inStockRu);

    formData.append("price", price);

    formData.append("companyTitleAz", companyTitleAz);
    formData.append("companyTitleEn", companyTitleEn);
    formData.append("companyTitleRu", companyTitleRu);
    formData.append("miniDescAz", miniDescAz);
    formData.append("miniDescEn", miniDescEn);
    formData.append("miniDescRu", miniDescRu);

    formData.append("selected_model", selectedModel ? selectedModel : "");

    try {
      const response = await axios.post(`${endpoint}/add-car`, formData, {
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
        setYear("");
        setVin("");
        setInStockAz("");
        setInStockEn("");
        setInStockRu("");
        setPrice("");
        setCompanyTitleAz("");
        setCompanyTitleEn("");
        setCompanyTitleRu("");
        setPreviewImg("");
        setMiniDescAz("");
        setMiniDescEn("");
        setMiniDescRu("");

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
        name="titleAz"
        placeholder="Məsələn KAIYI E5 Standart"
        required
        label="Maşının adını yazın (AZ)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
      />
      <InputField
        value={titleEn}
        name="titleEn"
        placeholder="Məsələn KAIYI E5 Standart"
        required
        label="Maşının adını yazın (EN)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
      />
      <InputField
        value={titleRu}
        name="titleRu"
        placeholder="Məsələn KAIYI E5 Standart"
        required
        label="Maşının adını yazın (RU)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
      />

      <InputField
        value={year}
        name="year"
        placeholder="Məsələn 2023"
        label="Maşının ilini yazın"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
      />

      <InputField
        value={vin}
        name="vin"
        placeholder="Məsələn XUUJA2G2*P0****22"
        label="VIN"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setVin(e.target.value)}
      />
      <InputField
        value={inStockAz}
        name="inStockAz"
        placeholder="Məsələn Stokdadır"
        required
        label="Maşının stokda olub olmamağını qeyd edin (AZ)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInStockAz(e.target.value)}
      />
      <InputField
        value={inStockEn}
        name="inStockEn"
        placeholder="Məsələn In Stock"
        required
        label="Maşının stokda olub olmamağını qeyd edin (EN)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInStockEn(e.target.value)}
      />
      <InputField
        value={inStockRu}
        name="inStockRu"
        placeholder="Məsələn В наличии"
        required
        label="Maşının stokda olub olmamağını qeyd edin (RU)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInStockRu(e.target.value)}
      />
      <InputField
        value={price}
        name="price"
        placeholder="Məsələn 28.000 AZN"
        required
        label="Maşının qiymətini yazın"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)}
      />
      <InputField
        value={companyTitleAz}
        name="companyTitleAz"
        placeholder="Məsələn AUTOGermes "
        label="Maşının kompani başlığı (AZ)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyTitleAz(e.target.value)}
      />
      <InputField
        value={companyTitleEn}
        name="companyTitleEn"
        placeholder="Məsələn AUTOGermes "
        label="Maşının kompani başlığı (EN)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyTitleEn(e.target.value)}
      />
      <InputField
        value={companyTitleRu}
        name="companyTitleRu"
        placeholder="Məsələn AUTOGermes "
        label="Maşının kompani başlığı (RU)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setCompanyTitleRu(e.target.value)}
      />
      <InputField
        value={miniDescAz}
        name="miniDescAz"
        placeholder="Maşının mini açıqlaması (AZ)"
        label="Maşına mini açıqlama əlavə edin (AZ)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setMiniDescAz(e.target.value)}
      />
      <InputField
        value={miniDescEn}
        name="miniDescEn"
        placeholder="Maşının mini açıqlaması (EN)"
        label="Maşına mini açıqlama əlavə edin (EN)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setMiniDescEn(e.target.value)}
      />
      <InputField
        value={miniDescRu}
        name="miniDescRu"
        placeholder="Maşının mini açıqlaması (RU)"
        label="Maşına mini açıqlama əlavə edin (RU)"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setMiniDescRu(e.target.value)}
      />

      <Select
        value={models?.find((option) => option?.value === selectedModel)}
        onChange={(selectedOption) => {
          setSelectedModel(selectedOption?.value);
        }}
        options={models}
        isSearchable={true}
        required
        name="selected_model"
        placeholder="Bu maşın hansı modelə aiddir?"
      />

      <InputImageField req={false} labelTitle="Maşının şəkilini yükləyin" onChange={handleChange} name="img" />
      {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default AddCarCreate;
