import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent } from "react";
import { endpoint } from "../../Baseurl";
import axios from "axios";
import Loader from "../../Loader";
import { IoChevronBackOutline } from "react-icons/io5";
import ButtonSubmit from "../../uitils/ui/ButtonSubmit";
import { EditModalState, LoadingState } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdEdit, MdSignalWifiStatusbar3Bar, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import SelectStatus from "../../uitils/ui/SelectStatus";
import InputField from "../../uitils/ui/InputField";
import { DataTypeCar } from "./AddCarShow";
import InputImageField from "../../uitils/ui/InputImageField";
import Select from "react-select";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const AddCarEdit: React.FC = () => {
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

  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeCar[]>({
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

  const hasData = fetchData && fetchData?.length > 0;

  const [edit, setEdit] = useRecoilState(EditModalState);
  const getEditModal = (_id: string) => {
    setEdit(_id);
  };

  type props = {
    data: DataTypeCar;
  };

  const columns: GridColDef[] = [
    { field: "titleAz", headerName: "Başlıq (AZ)", width: 160 },
    { field: "titleEn", headerName: "Başlıq (EN)", width: 160 },
    { field: "titleRu", headerName: "Başlıq (RU)", width: 160 },
    { field: "year", headerName: "İl", width: 160 },
    { field: "vin", headerName: "VIN", width: 160 },
    { field: "price", headerName: "Qiymət", width: 160 },
    { field: "selected_model", headerName: "Aid Olduğu Model", width: 160 },
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
    ? fetchData.map((data: DataTypeCar) => ({
        id: data?._id,
        titleAz: data?.title?.az,
        titleEn: data?.title?.en,
        titleRu: data?.title?.ru,
        year: data?.year,
        vin: data?.vin,
        price: data?.price,
        selected_model: data?.selected_model,
        status: data?.status,
      }))
    : [];

  // EDIT MODAL
  const EditModal: React.FC<props> = (props) => {
    const [loading, setLoading] = useRecoilState(LoadingState);
    const [titleAz, setTitleAz] = React.useState<string>(props?.data?.title?.az || "");
    const [titleEn, setTitleEn] = React.useState<string>(props?.data?.title?.en || "");
    const [titleRu, setTitleRu] = React.useState<string>(props?.data?.title?.ru || "");

    const [year, setYear] = React.useState<string>(props?.data?.year || "");
    const [vin, setVin] = React.useState<string>(props?.data?.vin || "");

    const [inStockAz, setInStockAz] = React.useState<string>(props?.data?.inStock?.az);
    const [inStockEn, setInStockEn] = React.useState<string>(props?.data?.inStock?.en);
    const [inStockRu, setInStockRu] = React.useState<string>(props?.data?.inStock?.ru);

    const [price, setPrice] = React.useState<string>(props?.data?.price || "");
    const [companyTitleAz, setCompanyTitleAz] = React.useState<string>(props?.data?.companyTitle?.az);
    const [companyTitleEn, setCompanyTitleEn] = React.useState<string>(props?.data?.companyTitle?.en);
    const [companyTitleRu, setCompanyTitleRu] = React.useState<string>(props?.data?.companyTitle?.ru);

    const [previewImg, setPreviewImg] = React.useState<string>(`https://kaiyi-21d4.onrender.com${props?.data?.carImage}` || "");
    const [image, setImage] = React.useState<File | null>(null);

    const [miniDescAz, setMiniDescAz] = React.useState<string>(props?.data?.miniDesc?.az || "");
    const [miniDescEn, setMiniDescEn] = React.useState<string>(props?.data?.miniDesc?.en || "");
    const [miniDescRu, setMiniDescRu] = React.useState<string>(props?.data?.miniDesc?.ru || "");

    const [color, setColor] = useColor("");
    const [selectedModel, setSelectedModel] = React.useState<string>(props?.data?.selected_model || "");

    const [selectedStatus, setSelectedStatus] = React.useState<string>(props?.data?.status || "active");

    const handleSelectStatus = (selectedOption: any) => {
      setSelectedStatus(selectedOption?.value);
    };

    //fill the defaul values
    React.useEffect(() => {
      setPreviewImg(`https://kaiyi-21d4.onrender.com${props?.data?.carImage}` || "");
      setSelectedModel(props?.data?.selected_model || "");
      setSelectedStatus(props?.data?.status || "active");
      setTitleAz(props?.data?.title?.az || "");
      setTitleEn(props?.data?.title?.en || "");
      setTitleRu(props?.data?.title?.ru || "");
      setYear(props?.data?.year || "");
      setVin(props?.data?.vin || "");
      setPrice(props?.data?.price || "");
      setCompanyTitleAz(props?.data?.companyTitle?.az || "");
      setCompanyTitleEn(props?.data?.companyTitle?.en || "");
      setCompanyTitleRu(props?.data?.companyTitle?.ru || "");
      setMiniDescAz(props?.data?.miniDesc?.az || "");
      setMiniDescEn(props?.data?.miniDesc?.en || "");
      setMiniDescRu(props?.data?.miniDesc?.ru || "");
      setInStockAz(props?.data?.inStock?.az || "");
      setInStockEn(props?.data?.inStock?.en || "");
      setInStockRu(props?.data?.inStock?.ru || "");
    }, [props?.data]);

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

    const handleEdit = async (e: React.FormEvent, id: string) => {
      e.preventDefault();

      setLoading(true);

      if (!color || !image || !titleAz || !titleEn || !titleRu || !price || !inStockAz || !inStockEn || !inStockRu) {
        toast.warning("Başlıqlar, şəkil və qiymət boş ola bilməz.", {
          position: "top-center",
        });
      } else if (color?.hex === props?.data?.color) {
        toast.warning("Bu rəng seçilmişdi, başqa rəng seçin.", {
          position: "top-center",
        });
      }

      const formData = new FormData();
      formData.append("titleAz", titleAz);
      formData.append("titleEn", titleEn);
      formData.append("titleRu", titleRu);

      formData.append("year", year);
      formData.append("vin", vin);
      formData.append("img", image ? image : "");

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

      formData.append("color", color.hex);

      formData.append("status", selectedStatus);
      formData.append("selected_model", selectedModel ? selectedModel : "");

      try {
        const response = await axios.put(`${endpoint}/add-car/${id}`, formData, {
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
      <div className="edit-modal">
        <div className="go-back" onClick={() => setEdit("")}>
          <IoChevronBackOutline className="backicon" />
          <span>Vazgeç</span>
        </div>
        <div className="edit-container">
          <form acceptCharset="UTF-8" onSubmit={(e: React.FormEvent) => handleEdit(e, props?.data?._id)}>
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

            <div className="input-field">
              <label htmlFor="">Maşın nə rəngdədir?*</label>
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

            <InputImageField req={false} labelTitle="Maşının şəkilini yükləyin" onChange={handleChange} name="img" />
            {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}

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
        fetchData?.map((data: DataTypeCar) => {
          if (edit === data._id) {
            return <EditModal key={data?._id} data={data} />;
          }
        })}
    </div>
  );
};

export default AddCarEdit;
