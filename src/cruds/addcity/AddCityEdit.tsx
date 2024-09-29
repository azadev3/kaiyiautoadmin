import { useEffect, ChangeEvent } from "react";
import React from "react";
import { endpoint } from "../../Baseurl";
import axios from "axios";
import Loader from "../../Loader";
import { IoChevronBackOutline } from "react-icons/io5";
import InputImageField from "../../uitils/ui/InputImageField";
import ButtonSubmit from "../../uitils/ui/ButtonSubmit";
import { EditModalState, LoadingState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import InputField from "../../uitils/ui/InputField";
import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdEdit, MdSignalWifiStatusbar3Bar, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import SelectStatus from "../../uitils/ui/SelectStatus";
import { DataTypeCity } from "./AddCityShow";

type Props = {
  data: DataTypeCity;
};

const AddCityEdit: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  //fetch data
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeCity[]>({
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

  const hasData = fetchData && fetchData?.length > 0;

  const [edit, setEdit] = useRecoilState(EditModalState);

  const getEditModal = (_id: string) => {
    setEdit(_id);
  };

  const columns: GridColDef[] = [
    { field: "cityNameAz", headerName: "Şəhər adı AZ", width: 80 },
    { field: "cityNameEn", headerName: "Şəhər adı EN", width: 80 },
    { field: "cityNameRu", headerName: "Şəhər adı RU", width: 80 },
    { field: "lat", headerName: "LAT", width: 80 },
    { field: "lng", headerName: "LNG", width: 80 },
    { field: "titleAz", headerName: "İnformasiya Başlıq AZ", width: 80 },
    { field: "valueAz", headerName: "Dəyər AZ", width: 80 },
    { field: "titleEn", headerName: "İnformasiya Başlıq EN", width: 80 },
    { field: "valueEn", headerName: "Dəyər EN", width: 80 },
    { field: "titleRu", headerName: "İnformasiya Başlıq RU", width: 80 },
    { field: "valueRu", headerName: "Dəyər RU", width: 80 },
    { field: "serviceNameAz", headerName: "Servis adı AZ", width: 80 },
    { field: "serviceNameEn", headerName: "Servis adı EN", width: 80 },
    { field: "serviceNameRu", headerName: "Servis adı RU", width: 80 },
    { field: "websiteLink", headerName: "Website Link", width: 80 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <button className={`status-btn ${params?.row?.status === "active" ? "actived" : ""}`}>
            {params?.row?.status === "active" ? (
              <MdSignalWifiStatusbar3Bar className="editicon" />
            ) : (
              <MdSignalWifiStatusbarNotConnected className="editicon" />
            )}
            <span>{params?.row?.status}</span>
          </button>
        );
      },
    },
    {
      field: "actions",
      headerName: "Əməliyyat",
      width: 150,
      renderCell: (params) => {
        return (
          <button className="edit-btn" onClick={() => getEditModal(params?.row?.id)}>
            <MdEdit className="editicon" />
            <span>Düzəliş et</span>
          </button>
        );
      },
    },
  ];

  const rows = hasData
    ? fetchData.map((data: DataTypeCity) => ({
        id: data?._id,
        cityNameAz: data?.cityName?.az || "",
        cityNameEn: data?.cityName?.en || "",
        cityNameRu: data?.cityName?.ru || "",
        lat: data?.coordinates?.lat || "",
        lng: data?.coordinates?.lng || "",
        titleAz: data?.informations ? data?.informations[0]?.title?.az || "" : "",
        valueAz: data?.informations ? data?.informations[0]?.value?.az || "" : "",
        titleEn: data?.informations ? data?.informations[0]?.title?.en || "" : "",
        valueEn: data?.informations ? data?.informations[0]?.value?.en || "" : "",
        titleRu: data?.informations ? data?.informations[0]?.title?.ru || "" : "",
        valueRu: data?.informations ? data?.informations[0]?.value?.ru || "" : "",
        serviceNameAz: data?.otherServices ? data?.otherServices[0]?.serviceName?.az || "" : "",
        serviceNameEn: data?.otherServices ? data?.otherServices[0]?.serviceName?.en || "" : "",
        serviceNameRu: data?.otherServices ? data?.otherServices[0]?.serviceName?.ru || "" : "",
        websiteLink: data?.websiteLink || "",
        status: data?.status,
      }))
    : [];

  //EDIT MODAL
  const EditModal: React.FC<Props> = (props) => {
    //states
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

    const [selectedStatus, setSelectedStatus] = React.useState<string>("active");

    const handleSelectStatus = (selectedOption: any) => {
      setSelectedStatus(selectedOption?.value);
    };

    //fill the defaul values
    useEffect(() => {
      if (props.data) {
        setCityNameAz(props?.data?.cityName?.az || "");
        setCityNameEn(props?.data?.cityName?.en || "");
        setCityNameRu(props?.data?.cityName?.ru || "");
        setLat(Number(props?.data?.coordinates?.lat) || null);
        setLng(Number(props?.data?.coordinates?.lng) || null);
        setTitleAz(props?.data?.informations[0]?.title?.az || "");
        setValueAz(props?.data?.informations[0]?.value?.az || "");
        setTitleEn(props?.data?.informations[0]?.title?.en || "");
        setValueEn(props?.data?.informations[0]?.value?.en || "");
        setTitleRu(props?.data?.informations[0]?.title?.ru || "");
        setValueRu(props?.data?.informations[0]?.value?.ru || "");
        setPreviewServiceIcon(props?.data?.otherServices[0]?.serviceIcon || "");
        setServiceNameAz(props?.data?.otherServices[0]?.serviceName?.az || "");
        setServiceNameEn(props?.data?.otherServices[0]?.serviceName?.en || "");
        setServiceNameRu(props?.data?.otherServices[0]?.serviceName?.ru || "");
        setWebsiteLink(props?.data?.websiteLink || "");
        setSelectedStatus(props?.data?.status || "");
      }
    }, [props?.data]);

    //edit
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

    const handleEdit = async (e: React.FormEvent, id: string) => {
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
      formData.append("status", selectedStatus);

      try {
        const response = await axios.put(`${endpoint}/city/${id}`, formData, {
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
      <div className="edit-modal">
        <div className="go-back" onClick={() => setEdit("")}>
          <IoChevronBackOutline className="backicon" />
          <span>Vazgeç</span>
        </div>
        <div className="edit-container">
          <form acceptCharset="UTF-8" onSubmit={(e: React.FormEvent) => handleEdit(e, props?.data?._id)}>
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
                <span>*LAT</span> və <span>*LNG</span> dəyərləri google mapsə daxil olaraq oradan istədiyiniz bir məkanı
                seçib üzərinə sağ click edib koordinatları kopyalamaqla əldə edə bilərsiniz.
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

            <SelectStatus onChange={handleSelectStatus} selectedStatus={props?.data?.status || "active"} />
            <ButtonSubmit isLoading={loading} />
          </form>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="edit-component">
      <div style={{ height: 490, width: "100%" }}>
        <DataGrid style={{ height: "490px" }} rows={rows} columns={columns} />
      </div>

      {hasData &&
        fetchData.map((data: DataTypeCity) => {
          if (edit === data?._id) {
            return <EditModal key={data?._id} data={data} />;
          }
          return null;
        })}
    </div>
  );
};

export default AddCityEdit;
