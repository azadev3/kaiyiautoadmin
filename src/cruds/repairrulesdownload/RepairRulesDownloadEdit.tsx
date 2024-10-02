import { useEffect, ChangeEvent } from "react";
import React from "react";
import axios from "axios";
import { IoChevronBackOutline } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdEdit, MdSignalWifiStatusbar3Bar, MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import { endpoint } from "../../Baseurl";
import { EditModalState, LoadingState } from "../../recoil/atoms";
import InputImageField from "../../uitils/ui/InputImageField";
import SelectStatus from "../../uitils/ui/SelectStatus";
import ButtonSubmit from "../../uitils/ui/ButtonSubmit";
import Loader from "../../Loader";
import { DataTypeRepairRulesDownload } from "./RepairRulesDownloadShow";
import InputField from "../../uitils/ui/InputField";

type Props = {
  data: DataTypeRepairRulesDownload;
};

const RepairRulesDownloadEdit: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  //fetch data
  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeRepairRulesDownload[]>({
    queryKey: ["fetchDataModelRepairRulesDownload"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/repair-rules-download`, {
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
    { field: "pdf", headerName: "Fayl", width: 260 },
    { field: "selected_model", headerName: "Modeldədir:", width: 260 },
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
    ? fetchData.map((data: DataTypeRepairRulesDownload) => ({
        id: data._id,
        pdf: data?.pdfs,
        status: data?.status,
      }))
    : [];

  //EDIT MODAL
  const EditModal: React.FC<Props> = (props) => {
    //states
    const [previewImg, setPreviewImg] = React.useState<string>(`https://kaiyi-21d4.onrender.com${props?.data?.image}` || "");
    const [image, setImage] = React.useState<File | null>(null);
    const [titleAz, setTitleAz] = React.useState<string>(props?.data?.title?.az || "");
    const [titleEn, setTitleEn] = React.useState<string>(props?.data?.title?.en || "");
    const [titleRu, setTitleRu] = React.useState<string>(props?.data?.title?.ru || "");

    const [pdf, setPdf] = React.useState<File | null>(null);

    const [selectedStatus, setSelectedStatus] = React.useState<string>("active");

    const handleSelectStatus = (selectedOption: any) => {
      setSelectedStatus(selectedOption?.value);
    };

    //fill the defaul values
    useEffect(() => {
      setTitleAz(props?.data?.title?.az || "");
      setTitleEn(props?.data?.title?.en || "");
      setTitleRu(props?.data?.title?.ru || "");
      setSelectedStatus(props?.data?.status || "active");
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
    // upload PDF file
    const handleUploadPdf = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setPdf(file);
      }
    };

    //edit
    const handleEdit = async (e: React.FormEvent, id: string) => {
      e.preventDefault();

      setLoading(true);

      if (!pdf || !image) {
        toast.warning("Xana və ya xanalar boş olmamalıdır.", {
          position: "top-center",
        });
        return;
      }

      const formData = new FormData();

      if (image) {
        formData.append("img", image);
      }

      if (pdf) {
        formData.append("pdf", pdf);
      }

      formData.append("title_az", titleAz);
      formData.append("title_en", titleEn);
      formData.append("title_ru", titleRu);
      formData.append("status", selectedStatus);

      try {
        const response = await axios.put(`${endpoint}/repair-rules-download/${id}`, formData, {
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
              required
              name="title_az"
              label="Təmir və Baxım - Baxım qaydaları Başlıq (AZ)*"
              placeholder="Məsələn: PETROL 1.5T, 6MT BACK"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleAz(e.target.value)}
            />
            <InputField
              required
              name="title_en"
              label="Təmir və Baxım - Baxım qaydaları Başlıq (EN)*"
              placeholder="Məsələn: PETROL 1.5T, 6MT BACK"
              value={titleEn}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
            />
            <InputField
              required
              name="title_ru"
              label="Təmir və Baxım - Baxım qaydaları Başlıq (RU)*"
              placeholder="Məsələn: PETROL 1.5T, 6MT BACK"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleRu(e.target.value)}
              value={titleRu}
            />
            <InputImageField labelTitle="Qaydaya ait şəkil yükləyin*" req={false} onChange={handleChange} name="img" />
            {previewImg && <img src={previewImg} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />}
            <InputImageField
              accepting={".pdf, .doc, .docx"}
              labelTitle="Qaydaya ait PDF - DOC - DOCX *"
              req={false}
              onChange={handleUploadPdf}
              name="pdf"
            />

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
        fetchData.map((data: DataTypeRepairRulesDownload) => {
          if (edit === data?._id) {
            return <EditModal key={data?._id} data={data} />;
          }
          return null;
        })}
    </div>
  );
};

export default RepairRulesDownloadEdit;
