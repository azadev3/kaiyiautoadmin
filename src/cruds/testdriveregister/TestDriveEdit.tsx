import { useEffect, useState, ChangeEvent } from "react";
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
import { DataTypeTestDrive } from "./TestDriveShow";

type Props = {
  data: DataTypeTestDrive;
};

const TestDriveEdit: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  //fetch data
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeTestDrive[]>({
    queryKey: ["fetchDataKeyTestDrive"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/testdrive`, {
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

  const columns: GridColDef[] = [
    { field: "titleAz", headerName: "Başlıq AZ", width: 260 },
    { field: "titleEn", headerName: "Başlıq EN", width: 260 },
    { field: "titleRu", headerName: "Başlıq RU", width: 260 },
    { field: "descriptionAz", headerName: "Açıqlama AZ", width: 200 },
    { field: "descriptionEn", headerName: "Açıqlama EN", width: 200 },
    { field: "descriptionRu", headerName: "Açıqlama RU", width: 200 },
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
    ? fetchData.map((data: DataTypeTestDrive) => ({
        id: data._id,
        titleAz: data?.title?.az,
        titleEn: data?.title?.en,
        titleRu: data?.title?.ru,
        descriptionAz: data?.description?.az,
        descriptionEn: data?.description?.en,
        descriptionRu: data?.description?.ru,
        status: data?.status,
      }))
    : [];

  //EDIT MODAL
  const EditModal: React.FC<Props> = (props) => {
    //states
    const [previewImg, setPreviewImg] = useState<string>(`http://localhost:3000${props?.data?.image}`);
    const [image, setImage] = React.useState<File | null>(null);
    const [descriptionAz, setDescriptionAz] = React.useState<string>(props?.data?.description?.az || "");
    const [descriptionEn, setDescriptionEn] = React.useState<string>(props?.data?.description?.en || "");
    const [descriptionRu, setDescriptionRu] = React.useState<string>(props?.data?.description?.ru || "");
    const [titleAz, setTitleAz] = useState<string>(props?.data?.title?.az || "");
    const [titleEn, setTitleEn] = useState<string>(props?.data.title?.en || "");
    const [titleRu, setTitleRu] = useState<string>(props?.data.title?.ru || "");
    const [selectedStatus, setSelectedStatus] = React.useState<string>("active");

    const handleSelectStatus = (selectedOption: any) => {
      setSelectedStatus(selectedOption?.value);
    };

    //fill the defaul values
    useEffect(() => {
      setTitleAz(props?.data?.title?.az || "");
      setTitleEn(props?.data?.title?.en || "");
      setTitleRu(props?.data?.title?.ru || "");
      setDescriptionAz(props?.data?.description?.az || "");
      setDescriptionEn(props?.data?.description?.en || "");
      setDescriptionRu(props?.data?.description?.ru || "");
      setPreviewImg(`http://localhost:3000${props?.data?.image}`);
      setSelectedStatus(props?.data?.status || "active");
    }, [props?.data]);

    //upload img
    const handleUpdateImage = async (e: ChangeEvent<HTMLInputElement>) => {
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

    //edit
    const handleEdit = async (e: React.FormEvent, id: string) => {
      e.preventDefault();

      setLoading(true);

      const formData = new FormData();
      formData.append("img", image ? image : "");
      formData.append("title_az", titleAz);
      formData.append("title_en", titleEn);
      formData.append("title_ru", titleRu);
      formData.append("description_az", descriptionAz);
      formData.append("description_en", descriptionEn);
      formData.append("description_ru", descriptionRu);
      formData.append("status", selectedStatus);

      try {
        const response = await axios.put(`${endpoint}/testdrive/${id}`, formData, {
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
              label="Test Sürüşü Qeydiyyat səhifəsi Hero Başlıq (AZ)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
            />
            <InputField
              label="Test Sürüşü Qeydiyyat səhifəsi Hero Başlıq (EN)"
              placeholder="Məsələn: Example data..."
              value={titleEn}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
            />
            <InputField
              label="Test Sürüşü Qeydiyyat səhifəsi Hero Başlıq (RU)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
              value={titleRu}
            />
            <InputField
              label="Test Sürüşü Qeydiyyat səhifəsi Hero Açıqlama (AZ) (maksimum: 80 hərf)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionAz(e.target.value)}
              value={descriptionAz}
              maxLength={80}
            />
            <InputField
              label="Test Sürüşü Qeydiyyat səhifəsi Hero Açıqlama (EN) (maksimum: 80 hərf)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionEn(e.target.value)}
              value={descriptionEn}
              maxLength={80}
            />
            <InputField
              label="Test Sürüşü Qeydiyyat səhifəsi Hero Açıqlama (RU) (maksimum: 80 hərf)"
              placeholder="Məsələn: Example data..."
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionRu(e.target.value)}
              value={descriptionRu}
              maxLength={80}
            />

            <InputImageField req={true} onChange={handleUpdateImage} name="img" />
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
        fetchData.map((data: DataTypeTestDrive) => {
          if (edit === data?._id) {
            return <EditModal key={data?._id} data={data} />;
          }
          return null;
        })}
    </div>
  );
};

export default TestDriveEdit;
