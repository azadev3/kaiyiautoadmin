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
import {
  MdEdit,
  MdOutlineRemoveCircleOutline,
  MdSignalWifiStatusbar3Bar,
  MdSignalWifiStatusbarNotConnected,
} from "react-icons/md";
import SelectStatus from "../../uitils/ui/SelectStatus";
import { OurAdvantagesType } from "./OurAdvantagesShow";
import { v4 as uuidv4 } from "uuid";
import { BiPlus } from "react-icons/bi";

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

type Props = {
  data: OurAdvantagesType;
};

const OurAdvantagesEdit: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  //fetch data
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<OurAdvantagesType[]>({
    queryKey: ["fetchDataKeyOurAdvantages"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/ouradvantages`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    },
    staleTime: 3000000,
  });

  const hasData = fetchData && fetchData?.length > 0;

  const [edit, setEdit] = useRecoilState(EditModalState);

  const getEditModal = (_id: string) => {
    setEdit(_id);
  };

  const columns: GridColDef[] = [
    { field: "navTitleAz", headerName: "Nav Başlıq AZ", width: 260 },
    { field: "navTitleEn", headerName: "Nav Başlıq EN", width: 260 },
    { field: "navTitleRu", headerName: "Nav Başlıq RU", width: 260 },
    { field: "content", headerName: "Kontent", width: 260 },
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
    ? fetchData.map((data: OurAdvantagesType) => ({
        id: data._id,
        navTitleAz: data?.navTitle?.az,
        navTitleEn: data?.navTitle?.en,
        navTitleRu: data?.navTitle?.ru,
        content: data?.content && Array.isArray(data?.content) && data?.content?.length > 0 ? "Əlavə edilib" : "Əlavə olunmayıb",
        status: data?.status,
      }))
    : [];

  //EDIT MODAL
  const EditModal: React.FC<Props> = (props) => {
    //states
    const [navTitleAz, setNavTitleAz] = React.useState<string>("");
    const [navTitleEn, setNavTitleEn] = React.useState<string>("");
    const [navTitleRu, setNavTitleRu] = React.useState<string>("");
    const [formNavContent, setFormNavContent] = React.useState<NavContent[]>([]);
    const [selectedStatus, setSelectedStatus] = React.useState<string>("active");

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

    const handleSelectStatus = (selectedOption: any) => {
      setSelectedStatus(selectedOption?.value);
    };

    //fill the defaul values
    useEffect(() => {
      setNavTitleAz(props?.data?.navTitle?.az || "");
      setNavTitleEn(props?.data?.navTitle?.en || "");
      setNavTitleRu(props?.data?.navTitle?.ru || "");
      setFormNavContent((prev) => [
        ...prev,
        {
          navTitleAz: props?.data?.navTitle.az || "",
          navTitleEn: props?.data?.navTitle.en || "",
          navTitleRu: props?.data?.navTitle.ru || "",
          descriptionAz: props?.data?.content ? props?.data?.content[Number(props?.data?._id)]?.description?.az || "" : "",
          descriptionEn: props?.data?.content ? props?.data?.content[Number(props?.data?._id)]?.description?.en || "" : "",
          descriptionRu: props?.data?.content ? props?.data?.content[Number(props?.data?._id)]?.description?.ru || "" : "",
          titleAz: props?.data?.content ? props?.data?.content[Number(props?.data?._id)]?.title?.az || "" : "",
          titleEn: props?.data?.content ? props?.data?.content[Number(props?.data?._id)]?.title?.en || "" : "",
          titleRu: props?.data?.content ? props?.data?.content[Number(props?.data?._id)]?.title?.ru || "" : "",
          icon: props?.data?.content ? props?.data?.content[Number(props?.data?._id)]?.icon || "" : "",
          id: props?.data?._id || "",
        },
      ]);
      setSelectedStatus(props?.data?.status || "active");
    }, [props?.data]);

    //upload img

    const handleEdit = async (e: React.FormEvent, id: string) => {
      e.preventDefault();

      setLoading(true);

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
      formData.append("status", selectedStatus);

      try {
        const response = await axios.put(`${endpoint}/ouradvantages/${id}`, formData, {
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
        fetchData.map((data: OurAdvantagesType) => {
          if (edit === data?._id) {
            return <EditModal key={data?._id} data={data} />;
          }
          return null;
        })}
    </div>
  );
};

export default OurAdvantagesEdit;
