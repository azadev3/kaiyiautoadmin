//! this is main Satis Noqtesi Tap
import React, { ChangeEvent } from "react";
import InputImageField from "../../uitils/ui/InputImageField";
import ButtonSubmit from "../../uitils/ui/ButtonSubmit";
import axios from "axios";
import { endpoint } from "../../Baseurl";
import { useRecoilState } from "recoil";
import { LoadingState } from "../../recoil/atoms";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import InputField from "../../uitils/ui/InputField";
import { DataTypeCity } from "./AddCityShow";

const AddCityCreate: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  //city
  const [cityNameAz, setCityNameAz] = React.useState<string>("");
  const [cityNameEn, setCityNameEn] = React.useState<string>("");
  const [cityNameRu, setCityNameRu] = React.useState<string>("");
  const [lat, setLat] = React.useState<number | null>(null);
  const [lng, setLng] = React.useState<number | null>(null);
  //informations
  const [titleAz, setTitleAz] = React.useState<string>("");
  const [titleEn, setTitleEn] = React.useState<string>("");
  const [titleRu, setTitleRu] = React.useState<string>("");
  const [valueAz, setValueAz] = React.useState<string>("");
  const [valueEn, setValueEn] = React.useState<string>("");
  const [valueRu, setValueRu] = React.useState<string>("");
  //other services in city
  const [previewServiceIcon, setPreviewServiceIcon] = React.useState<string>("");
  const [serviceIcon, setServiceIcon] = React.useState<File | null>(null);
  const [serviceNameAz, setServiceNameAz] = React.useState<string>("");
  const [serviceNameEn, setServiceNameEn] = React.useState<string>("");
  const [serviceNameRu, setServiceNameRu] = React.useState<string>("");
  //website link
  const [websiteLink, setWebsiteLink] = React.useState<string>("");

  const { refetch } = useQuery<DataTypeCity[]>({
    queryKey: ["fetchDataKeyCities"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/city`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data?.cities;
    },
    staleTime: 3000000,
  });

  const handleChangeMiniImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      setServiceIcon(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewServiceIcon(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("cityNameAz", cityNameAz);
    formData.append("cityNameEn", cityNameEn);
    formData.append("cityNameRu", cityNameRu);
    formData.append("lat", String(lat));
    formData.append("lng", String(lng));
    formData.append("titleAz", titleAz);
    formData.append("titleEn", titleEn);
    formData.append("titleRu", titleRu);
    formData.append("valueAz", valueAz);
    formData.append("valueEn", valueEn);
    formData.append("valueRu", valueRu);
    formData.append("img", serviceIcon ? serviceIcon : "");
    formData.append("serviceNameAz", serviceNameAz);
    formData.append("serviceNameEn", serviceNameEn);
    formData.append("serviceNameRu", serviceNameRu);
    formData.append("websiteLink", websiteLink);

    try {
      const response = await axios.post(`${endpoint}/city`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        toast.success("Əla! Uğurla əlavə edildi.", {
          position: "top-center",
        });
        setCityNameAz("");
        setCityNameEn("");
        setCityNameRu("");
        setLat(null);
        setLng(null);
        setTitleAz("");
        setTitleEn("");
        setTitleRu("");
        setValueAz("");
        setValueEn("");
        setValueRu("");
        setPreviewServiceIcon("");
        setServiceIcon(null);
        setServiceNameAz("");
        setServiceNameEn("");
        setServiceNameRu("");
        setWebsiteLink("");

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
      <div className="city-area">
        <h2>-Şəhər və onun koordinatlarını əlavə et</h2>
        <InputField
          value={cityNameAz}
          name="cityNameAz"
          label="Şəhər adı (AZ)"
          placeholder="Məsələn: Bakı"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCityNameAz(e.target.value)}
        />

        <InputField
          value={cityNameEn}
          name="cityNameEn"
          label="Şəhər adı (EN)"
          placeholder="Məsələn: Bakı"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCityNameEn(e.target.value)}
        />

        <InputField
          value={cityNameRu}
          name="cityNameRu"
          label="Şəhər adı (RU)"
          placeholder="Məsələn: Bakı"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setCityNameRu(e.target.value)}
        />

        <InputField
          type="number"
          value={Number(lat)}
          name="lat"
          label="LAT Koordinatı"
          required
          placeholder="Buna bənzər birşey almalısınız: lat: 43.43668501090926"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLat(Number(e.target.value))}
        />
        <InputField
          type="number"
          value={Number(lng)}
          name="lng"
          label="LNG Koordinatı"
          required
          placeholder="Buna bənzər birşey almalısınız: lng: 44.824601547178226"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLng(Number(e.target.value))}
        />
        <strong>
          <span>*LAT</span> və <span>*LNG</span> dəyərləri google mapsə daxil olaraq oradan istədiyiniz bir məkanı seçib
          üzərinə sağ click edib koordinatları kopyalamaqla əldə edə bilərsiniz.
        </strong>
      </div>
      <div className="city-area">
        <h2>- Şəhərə əlavə informasiya məlumatları əlavə et</h2>
        <InputField
          value={titleAz}
          name="titleAz"
          label="İnformasiya başlığı (AZ)"
          placeholder="Məsələn: Adress"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
        />
        <InputField
          value={valueAz}
          name="valueAz"
          label="Dəyər (AZ)"
          placeholder="Məsələn: Bakı"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValueAz(e.target.value)}
        />
        <InputField
          value={titleEn}
          name="titleEn"
          label="İnformasiya başlığı (EN)"
          placeholder="Məsələn: Bakı"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
        />
        <InputField
          value={valueEn}
          name="valueEn"
          label="Dəyər (EN)"
          placeholder="Məsələn: Bakı"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValueEn(e.target.value)}
        />
        <InputField
          value={titleRu}
          name="titleRu"
          label="İnformasiya başlığı (RU)"
          placeholder="Məsələn: Bakı"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
        />
        <InputField
          value={valueRu}
          name="valueRu"
          label="Dəyər (RU)"
          placeholder="Məsələn: Bakı"
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValueRu(e.target.value)}
        />
      </div>

      <div className="city-area">
        <h2>-Şəhərlərə əlavə olaraq servis məlumatları, ikonlar əlavə et</h2>
        <InputField
          type="text"
          value={serviceNameAz}
          name="serviceNameAz"
          label="Servis Adı (AZ)"
          placeholder="Məsələn: Maşın satışı, Test sürüşü, Servis və s."
          onChange={(e: ChangeEvent<HTMLInputElement>) => setServiceNameAz(e.target.value)}
        />
        <InputField
          type="text"
          value={serviceNameEn}
          name="serviceNameEn"
          label="Servis Adı (EN)"
          placeholder="Məsələn: Maşın satışı, Test sürüşü, Servis və s."
          onChange={(e: ChangeEvent<HTMLInputElement>) => setServiceNameEn(e.target.value)}
        />
        <InputField
          type="text"
          value={serviceNameRu}
          name="serviceNameRu"
          label="Servis Adı (RU)"
          placeholder="Məsələn: Maşın satışı, Test sürüşü, Servis və s."
          onChange={(e: ChangeEvent<HTMLInputElement>) => setServiceNameRu(e.target.value)}
        />

        <InputImageField
          req={true}
          onChange={handleChangeMiniImage}
          name="img"
          labelTitle="Servis üçün kiçik ikon əlavə et"
        />
        {previewServiceIcon && (
          <img src={previewServiceIcon} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />
        )}
      </div>

      <div className="city-area">
        <h2>-Şəhər üçün sayt linki əlavə et</h2>
        <InputField
          type="text"
          value={websiteLink}
          name="websiteLink"
          label="Şəhər kartına əlavə etmək istədiyiniz saytın linkini bura yerləşdirin"
          placeholder="Məsələn: https://www.example.com/"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setWebsiteLink(e.target.value)}
        />
      </div>

      <ButtonSubmit isLoading={loading} />
    </form>
  );
};

export default AddCityCreate;
