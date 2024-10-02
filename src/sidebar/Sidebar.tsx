import React from "react";
import SidebarLink from "./SidebarLink";
import { FaGripLines, FaHouse, FaImage, FaNewspaper, FaTrademark } from "react-icons/fa6";
import { MdAirlineStops } from "react-icons/md";
import { BsTranslate } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { IoLogoModelS } from "react-icons/io";
import { TbCreditCardPay } from "react-icons/tb";
import { GrInsecure } from "react-icons/gr";
import { PiTrafficSignalFill } from "react-icons/pi";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineContactSupport } from "react-icons/md";
import { FaCarCrash } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { GrUserManager } from "react-icons/gr";
import { ReactNode } from "react";

// SidebarLinks for any used
export interface SidebarLinkType {
  title: string;
  to: string;
  activeLinkIcon: ReactNode;
  isDropdown?: boolean;
  dropdownItems?: { id: number; title: string; to: string }[];
}

export const SidebarLinksForUsed: SidebarLinkType[] = [
  { title: "Əsas", to: "/", activeLinkIcon: <FaHouse /> },
  { title: "Hero", to: "/hero", activeLinkIcon: <FaImage /> },
  { title: "Xəbər Abunəlikləri", to: "/subscribtionNews", activeLinkIcon: <FaNewspaper /> },
  { title: "Diler ol", to: "/become-dealer", activeLinkIcon: <FaTrademark /> },
  { title: "Tərcümələr", to: "/translates", activeLinkIcon: <BsTranslate /> },
  { title: "Maşın əlavə et", to: "/add-car", activeLinkIcon: <FaCarCrash /> },
  { title: "Sosial Media əlavə et", to: "/add-socials", activeLinkIcon: <IoShareSocialSharp /> },
  { title: "Menecerlər üçün", to: "/contact-manager", activeLinkIcon: <GrUserManager /> },
  {
    title: "TopHeader",
    to: "",
    activeLinkIcon: <MdAirlineStops />,
    isDropdown: true,
    dropdownItems: [
      { id: 1, title: "Loqo", to: "/logo" },
      { id: 2, title: "Ünvan", to: "/location" },
      { id: 3, title: "Telefon", to: "/telephone" },
    ],
  },
  {
    title: "Tablar",
    to: "",
    activeLinkIcon: <FaGripLines />,
    isDropdown: true,
    dropdownItems: [
      { id: 1, title: "Dizayn", to: "/designtab" },
      { id: 2, title: "İnteryer", to: "/interiertab" },
      { id: 3, title: "Təhlükəsizlik", to: "/securitytab" },
      { id: 4, title: "Baxış", to: "/viewtab" },
      { id: 5, title: "Rahatlıq", to: "/comfortabletab" },
      { id: 6, title: "Modellər", to: "/modelstab" },
      { id: 7, title: "Xəbərlər", to: "/newstab" },
    ],
  },
  {
    title: "Satış Nöqtəsi Tap",
    to: "",
    activeLinkIcon: <FiMapPin />,
    isDropdown: true,
    dropdownItems: [
      { id: 1, title: "Şəhər əlavə et", to: "/findsales" },
      { id: 2, title: "Diler Əlavə Et", to: "/add-dealer" },
      { id: 3, title: "Dilerlə Əlaqə Yaradanlar", to: "/dealer-contacts" },
    ],
  },
  {
    title: "Model Daxili",
    to: "",
    activeLinkIcon: <IoLogoModelS />,
    isDropdown: true,
    dropdownItems: [
      { id: 1, title: "Daxili Video", to: "/modelvideotab" },
      { id: 2, title: "Daxili Dizayn", to: "/modeldesigntab" },
      { id: 3, title: "Daxili İnteryer", to: "/modelinteriertab" },
      { id: 4, title: "Daxili Komfort", to: "/modelcomfortab" },
      { id: 5, title: "İstifadəçi Təlimatları (PDF)", to: "/modelpdf" },
    ],
  },
  {
    title: "Alıcılar Üçün",
    to: "",
    activeLinkIcon: <TbCreditCardPay />,
    isDropdown: true,
    dropdownItems: [
      { id: 1, title: "Test Sürüşü Hero", to: "/test-drive-hero" },
      { id: 2, title: "Test Sürüşü Qeydiyyatçılar", to: "/test-drive-registers" },
      { id: 3, title: "Korporativ Müştərilər Üçün", to: "/for-corporate-customers" },
      { id: 4, title: "Üstünlüklərimiz", to: "/our-advantages" },
      { id: 5, title: "Korporativ Müştəri Sorğuları", to: "/for-corporate-requests" },
    ],
  },
  {
    title: "KAIYI Garantiya Xidməti",
    activeLinkIcon: <GrInsecure />,
    to: "",
    isDropdown: true,
    dropdownItems: [
      { id: 1, title: "Qarantiya Hero Hissə", to: "/kaiyi-guarante-hero" },
      { id: 2, title: "Qarantiya Açıqlama Hissə", to: "/kaiyi-guarante-description" },
      { id: 3, title: "Qarantiya ATTENTION Hissə", to: "/kaiyi-guarante-attention" },
    ],
  },
  {
    title: "Yol Qaydaları",
    activeLinkIcon: <PiTrafficSignalFill />,
    to: "",
    isDropdown: true,
    dropdownItems: [
      { id: 1, title: "Yol Qaydaları Hero Hissə", to: "/traffic-rules-hero" },
      { id: 2, title: "Təcili texniki yardım", to: "/traffic-rules-helped" },
      { id: 3, title: "Aşağı bölmə", to: "/traffic-rules-bottom" },
    ],
  },
  {
    title: "Təmir və Baxım",
    activeLinkIcon: <HiMiniWrenchScrewdriver />,
    to: "",
    isDropdown: true,
    dropdownItems: [
      { id: 1, title: "Təmir və Baxım Hero Hissə", to: "/repair-hero" },
      { id: 2, title: "Qaydaları Yükləyin Bölməsi", to: "/repair-rules-download" },
    ],
  },
  {
    title: "KAIYI Tarixi",
    activeLinkIcon: <BsClockHistory />,
    to: "",
    isDropdown: true,
    dropdownItems: [
      { id: 1, title: "EY KAIYI - Hero Hissə", to: "/kaiyi-history-hero" },
      { id: 2, title: "EY KAIYI - Aşağı Hissələr", to: "/kaiyi-history-bottom" },
      { id: 3, title: "EY KAIYI - Bloqlar", to: "/kaiyi-history-blogs" },
      { id: 4, title: "EY KAIYI - Yeniliklər", to: "/kaiyi-history-news" },
    ],
  },
  {
    title: "EY KAIYI - Əlaqə",
    activeLinkIcon: <MdOutlineContactSupport />,
    to: "",
    isDropdown: true,
    dropdownItems: [
      { id: 1, title: "Əlaqə", to: "/kaiyi-contact-hero" },
      { id: 2, title: "Geri dönüşlər (Feedback)", to: "/kaiyi-contact-feedback" },
    ],
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      {/* {sidebar ? (
        <BsLayoutSidebarInsetReverse className="collapse-sidebar" onClick={toggleSidebar} />
      ) : (
        <BsLayoutSidebarInset className="collapse-sidebar" onClick={toggleSidebar} />
      )} */}
      <SidebarLink title="Əsas" to="/" activeLinkIcon={<FaHouse />} />
      <SidebarLink title="Hero" to="/hero" activeLinkIcon={<FaImage />} />
      <SidebarLink title="Xəbər Abunəlikləri" to="/subscribtionNews" activeLinkIcon={<FaNewspaper />} />
      <SidebarLink title="Diler ol" to="/become-dealer" activeLinkIcon={<FaTrademark />} />
      <SidebarLink title="Tərcümələr" to="/translates" activeLinkIcon={<BsTranslate />} />
      <SidebarLink title="Maşın əlavə et" to="/add-car" activeLinkIcon={<FaCarCrash />} />
      <SidebarLink title="Sosial Media əlavə et" to="/add-socials" activeLinkIcon={<IoShareSocialSharp />} />
      <SidebarLink title="Menecerlər üçün" to="/contact-manager" activeLinkIcon={<GrUserManager />} />
      <SidebarLink
        title="TopHeader"
        to=""
        activeLinkIcon={<MdAirlineStops />}
        isDropdown={true}
        dropdownItems={[
          { id: 1, title: "Loqo", to: "/logo" },
          { id: 2, title: "Ünvan", to: "/location" },
          { id: 3, title: "Telefon", to: "/telephone" },
        ]}
      />
      <SidebarLink
        title="Tablar"
        to=""
        activeLinkIcon={<FaGripLines />}
        isDropdown={true}
        dropdownItems={[
          { id: 1, title: "Dizayn", to: "/designtab" },
          { id: 2, title: "İnteryer", to: "/interiertab" },
          { id: 3, title: "Təhlükəsizlik", to: "/securitytab" },
          { id: 4, title: "Baxış", to: "/viewtab" },
          { id: 5, title: "Rahatlıq", to: "/comfortabletab" },
          { id: 6, title: "Modellər", to: "/modelstab" },
          { id: 7, title: "Xəbərlər", to: "/newstab" },
        ]}
      />
      <SidebarLink
        title="Satış Nöqtəsi Tap"
        to=""
        activeLinkIcon={<FiMapPin />}
        isDropdown={true}
        dropdownItems={[
          { id: 1, title: "Şəhər əlavə et", to: "/findsales" },
          { id: 2, title: "Diler Əlavə Et", to: "/add-dealer" },
          { id: 3, title: "Dilerlə Əlaqə Yaradanlar", to: "/dealer-contacts" },
        ]}
      />
      <SidebarLink
        title="Model Daxili"
        to=""
        activeLinkIcon={<IoLogoModelS />}
        isDropdown={true}
        dropdownItems={[
          { id: 1, title: "Daxili Video", to: "/modelvideotab" },
          { id: 2, title: "Daxili Dizayn", to: "/modeldesigntab" },
          { id: 3, title: "Daxili İnteryer", to: "/modelinteriertab" },
          { id: 4, title: "Daxili Komfort", to: "/modelcomfortab" },
          { id: 4, title: "Daxili Təhlükəsizlik", to: "/modelsectab" },
          { id: 5, title: "İstifadəçi Təlimatları (PDF)", to: "/modelpdf" },
        ]}
      />
      <SidebarLink
        title="Alıcılar Üçün"
        to=""
        activeLinkIcon={<TbCreditCardPay />}
        isDropdown={true}
        dropdownItems={[
          { id: 1, title: "Test Sürüşü Hero", to: "/test-drive-hero" },
          { id: 2, title: "Test Sürüşü Qeydiyyatçılar", to: "/test-drive-registers" },
          { id: 3, title: "Korporativ Müştərilər Üçün", to: "/for-corporate-customers" },
          { id: 4, title: "Üstünlüklərimiz", to: "/our-advantages" },
          { id: 5, title: "Korporativ Müştəri Sorğuları", to: "/for-corporate-requests" },
        ]}
      />
      <SidebarLink
        title="KAIYI Qarantiya Xidməti"
        to=""
        activeLinkIcon={<GrInsecure />}
        isDropdown={true}
        dropdownItems={[
          { id: 1, title: "Qarantiya Hero Hissə", to: "/kaiyi-guarante-hero" },
          { id: 2, title: "Qarantiya Açıqlama Hissə", to: "/kaiyi-guarante-description" },
          { id: 3, title: "Qarantiya ATTENTION Hissə", to: "/kaiyi-guarante-attention" },
        ]}
      />
      <SidebarLink
        title="Yol Qaydaları"
        to=""
        activeLinkIcon={<PiTrafficSignalFill />}
        isDropdown={true}
        dropdownItems={[
          { id: 1, title: "Yol Qaydaları Hero Hissə", to: "/traffic-rules-hero" },
          { id: 2, title: "Təcili texniki yardım", to: "/traffic-rules-helped" },
          { id: 3, title: "Aşağı bölmə", to: "/traffic-rules-bottom" },
        ]}
      />
      <SidebarLink
        title="Təmir və Baxım"
        to=""
        activeLinkIcon={<HiMiniWrenchScrewdriver />}
        isDropdown={true}
        dropdownItems={[
          { id: 1, title: "Təmir və Baxım Hero Hissə", to: "/repair-hero" },
          { id: 2, title: "Qaydaları Yükləyin Bölməsi", to: "/repair-rules-download" },
        ]}
      />
      <SidebarLink
        title="KAIYI Tarixi"
        to=""
        activeLinkIcon={<BsClockHistory />}
        isDropdown={true}
        dropdownItems={[
          { id: 1, title: "EY KAIYI - Hero Hissə", to: "/kaiyi-history-hero" },
          { id: 2, title: "EY KAIYI - Aşağı Hissələr", to: "/kaiyi-history-bottom" },
          { id: 3, title: "EY KAIYI - Bloqlar", to: "/kaiyi-history-blogs" },
          { id: 4, title: "EY KAIYI - Yeniliklər", to: "/kaiyi-history-news" },
        ]}
      />
      <SidebarLink
        title="EY KAIYI - Əlaqə"
        to=""
        activeLinkIcon={<MdOutlineContactSupport />}
        isDropdown={true}
        dropdownItems={[
          { id: 1, title: "Əlaqə", to: "/kaiyi-contact-hero" },
          { id: 2, title: "Geri dönüşlər (Feedback)", to: "/kaiyi-contact-feedback" },
        ]}
      />
    </aside>
  );
};

export default Sidebar;
