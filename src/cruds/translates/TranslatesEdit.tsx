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
import { DataTypeTranslate } from "./TranslatesShow";
import InputField from "../../uitils/ui/InputField";
import { MdEdit } from "react-icons/md";

const TranslatesEdit: React.FC = () => {
  const [loading, setLoading] = useRecoilState(LoadingState);

  const {
    data: fetchData,
    isLoading,
    refetch,
  } = useQuery<DataTypeTranslate[]>({
    queryKey: ["fetchDataKeyTranslates"],
    queryFn: async () => {
      const response = await axios.get(`${endpoint}/translates`, {
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
    data: DataTypeTranslate;
  };

  const columns: GridColDef[] = [
    { field: "key", headerName: "KEY Dəyəri", width: 130 },
    { field: "azTitle", headerName: "Azərbaycan", width: 150 },
    { field: "enTitle", headerName: "İngilis", width: 150 },
    { field: "ruTitle", headerName: "Rus", width: 150 },
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
    ? fetchData.map((data: DataTypeTranslate) => ({
        id: data?._id || "",
        key: data?.key || "",
        azTitle: data?.azTitle || "",
        enTitle: data?.enTitle || "",
        ruTitle: data?.ruTitle || "",
      }))
    : [];

  // EDIT MODAL
  const EditModal: React.FC<props> = (props) => {
    const [azTitle, setAzTitle] = React.useState<string>("");
    const [enTitle, setEnTitle] = React.useState<string>("");
    const [ruTitle, setRuTitle] = React.useState<string>("");

    const handleEdit = async (e: React.FormEvent, id: string) => {
      e.preventDefault();

      setLoading(true);
  
      if (!azTitle || !enTitle || !ruTitle) {
        toast.error("Bütün alanlar dolmalıdır!", {
          position: "top-center",
        });
        setLoading(false);
        return;
      }
  
      const data = {
        azTitle: azTitle,
        enTitle: enTitle,
        ruTitle: ruTitle,
      };
  
      try {
        const response = await axios.post(`${endpoint}/translates/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.data) {
          toast.success("Əla! Uğurla əlavə edildi.", {
            position: "top-center",
          });
          setAzTitle("");
          setEnTitle("");
          setRuTitle("");
          refetch();
        } else {
          toast.error("Bir problem oldu.", {
            position: "top-center",
          });
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            toast.warning("Görünür ki, eyni KEYi birdən çox istifadə etməyə çalışırsınız... Bu qadağandır!", {
              position: "top-center",
            });
          } else {
            toast.error("Bir problem oldu.", {
              position: "top-center",
            });
          }
        }
        console.error("Error 3:", error);
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
              label="Tərcümələr - AZƏRBAYCANCA SÖZ"
              placeholder="Məsələn: Haqqımızda"
              value={azTitle}
              name="az_title"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setAzTitle(e.target.value)}
            />
            <InputField
              label="Tərcümələr - İNGİLİSCƏ SÖZ"
              placeholder="Məsələn: About us"
              value={enTitle}
              name="en_title"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEnTitle(e.target.value)}
            />
            <InputField
              label="Tərcümələr - RUSCA SÖZ"
              placeholder="Məsələn: О нас"
              value={ruTitle}
              name="ru_title"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRuTitle(e.target.value)}
            />
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
        fetchData?.map((data: DataTypeTranslate) => {
          if (edit === data._id) {
            return <EditModal key={data?._id} data={data} />;
          }
        })}
    </div>
  );
};

export default TranslatesEdit;
