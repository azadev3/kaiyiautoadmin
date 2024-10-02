import React, { ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { endpoint } from "../../../Baseurl";
import InputImageField from "../../../uitils/ui/InputImageField";
import ButtonSubmit from "../../../uitils/ui/ButtonSubmit";
import { useRecoilState } from "recoil";
import { LoadingState } from "../../../recoil/atoms";
import Select from "react-select";
import { DataTypeModelPdf } from "./ModelPdfShow";

const ModelPdfCreate: React.FC = () => {
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
  const [pdf, setPdf] = React.useState<File | null>(null);
  const [selectedModel, setSelectedModel] = React.useState<string | null>(null);

  const { refetch } = useQuery<DataTypeModelPdf[]>({
    queryKey: ["fetchDataModelPdf"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/modelpdf`, {
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
      setPdf(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (!pdf) {
      toast.warning("Xana və ya xanalar boş olmamalıdır.", {
        position: "top-center",
      });
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdf ? pdf : "");
    formData.append("selected_model", selectedModel ? selectedModel : "");

    try {
      const response = await axios.post(`${endpoint}/modelpdf`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        toast.success("Əla! Uğurla əlavə edildi.", {
          position: "top-center",
        });
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
        labelTitle="Fayl yükləyin (PDF, DOC, DOCX)"
        accepting={".pdf, .doc, .docx"}
        onChange={handleChange}
        name="img"
        req={false}
      />
      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default ModelPdfCreate;
