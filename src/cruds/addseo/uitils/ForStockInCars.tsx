import React, { ChangeEvent, FormEvent } from 'react'
import InputField from '../../../uitils/ui/InputField'
import axios from 'axios';
import { endpoint } from '../../../Baseurl';
import { toast } from 'react-toastify';

export interface SeoInterface {
    meta_title: string;
    meta_description: string;
}

const ForStockInCars: React.FC = () => {

    const [metaTitleAz, setMetaTitleAz] = React.useState<string>("");
    const [metaTitleEn, setMetaTitleEn] = React.useState<string>("");
    const [metaTitleRu, setMetaTitleRu] = React.useState<string>("");
    const [metaDescriptionAz, setMetaDescriptionAz] = React.useState<string>("");
    const [metaDescriptionEn, setMetaDescriptionEn] = React.useState<string>("");
    const [metaDescriptionRu, setMetaDescriptionRu] = React.useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = {
                metaTitleAz: metaTitleAz,
                metaTitleEn: metaTitleEn,
                metaTitleRu: metaTitleRu,
                metaDescriptionAz: metaDescriptionAz,
                metaDescriptionEn: metaDescriptionEn,
                metaDescriptionRu: metaDescriptionRu,
            }

            const res = await axios.post(`${endpoint}/stockincars-seo`, data);
            if (res.data) {
                toast.success("Məlumat uğurla əlavə edildi", {
                    position: "top-right",
                });
                console.log(res.data);
            } else {
                console.log(res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${endpoint}/stockincars-seo`);
                if (response) {
                    setMetaTitleAz(response.data[0].meta_title.az || "");
                    setMetaTitleEn(response.data[0].meta_title.en || "");
                    setMetaTitleRu(response.data[0].meta_title.ru || "");
                    setMetaDescriptionAz(response.data[0].meta_description.az || "");
                    setMetaDescriptionEn(response.data[0].meta_description.en || "");
                    setMetaDescriptionRu(response.data[0].meta_description.ru || "");
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <form onSubmit={handleSubmit} acceptCharset='UTF-8' className='accordion-content'>
            <div className="input-field">
                <label htmlFor="">Əldə Olan Maşınlar <strong>meta başlıq</strong> (AZ)</label>
                <InputField name='metaTitleAz' required onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaTitleAz(e.target.value)} value={metaTitleAz} />
            </div>
            <div className="input-field">
                <label htmlFor="">Əldə Olan Maşınlar <strong>meta başlıq</strong> (EN)</label>
                <InputField name='metaTitleEn' required onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaTitleEn(e.target.value)} value={metaTitleEn} />
            </div>
            <div className="input-field">
                <label htmlFor="">Əldə Olan Maşınlar <strong>meta başlıq</strong> (RU)</label>
                <InputField name='metaTitleRu' required onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaTitleRu(e.target.value)} value={metaTitleRu} />
            </div>
            <div className="input-field">
                <label htmlFor="">Əldə Olan Maşınlar <strong>meta açıqlama</strong> (AZ)</label>
                <InputField name='metaDescriptionAz' required onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaDescriptionAz(e.target.value)} value={metaDescriptionAz} />
            </div>
            <div className="input-field">
                <label htmlFor="">Əldə Olan Maşınlar <strong>meta açıqlama</strong> (EN)</label>
                <InputField name='metaDescriptionEn' required onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaDescriptionEn(e.target.value)} value={metaDescriptionEn} />
            </div>
            <div className="input-field">
                <label htmlFor="">Əldə Olan Maşınlar <strong>meta açıqlama</strong> (RU)</label>
                <InputField name='metaDescriptionRu' required onChange={(e: ChangeEvent<HTMLInputElement>) => setMetaDescriptionRu(e.target.value)} value={metaDescriptionRu} />
            </div>
            <button type='submit' className='button-submit'>Göndər</button>
        </form>
    )
}

export default ForStockInCars