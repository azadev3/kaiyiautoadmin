import React, { ChangeEvent } from "react";
import ButtonSubmit from "../../uitils/ui/ButtonSubmit";
import axios from "axios";
import { endpoint } from "../../Baseurl";
import { useRecoilState } from "recoil";
import { LoadingState } from "../../recoil/atoms";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { DataTypeDealerCenter } from "./AddDealerShow";
import InputField from "../../uitils/ui/InputField";

const AddDealerCreate: React.FC = () => {
  const { refetch } = useQuery<DataTypeDealerCenter[]>({
    queryKey: ["fetchDataKeyDealer"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/add-dealer`, {
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
  const [dealerNameAz, setDealerNameAz] = React.useState<string>("");
  const [dealerNameEn, setDealerNameEn] = React.useState<string>("");
  const [dealerNameRu, setDealerNameRu] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("dealerNameAz", dealerNameAz);
    formData.append("dealerNameEn", dealerNameEn);
    formData.append("dealerNameRu", dealerNameRu);

    try {
      const response = await axios.post(`${endpoint}/add-dealer`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        toast.success("Əla! Uğurla əlavə edildi.", {
          position: "top-center",
        });
        setDealerNameAz("");
        setDealerNameEn("");
        setDealerNameRu("");
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
        name="dealerNameAz"
        placeholder="Diler mərkəzinin adı"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDealerNameAz(e.target.value)}
        value={dealerNameAz}
        required
        label="Diler mərkəzinin adını yazın (AZ)"
      />
      <InputField
        name="dealerNameEn"
        placeholder="Diler mərkəzinin adı"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDealerNameEn(e.target.value)}
        value={dealerNameEn}
        required
        label="Diler mərkəzinin adını yazın (EN)"
      />
      <InputField
        name="dealerNameRu"
        placeholder="Diler mərkəzinin adı"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDealerNameRu(e.target.value)}
        value={dealerNameRu}
        required
        label="Diler mərkəzinin adını yazın (RU)"
      />
      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default AddDealerCreate;
