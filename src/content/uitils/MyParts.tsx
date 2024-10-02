import React from "react";
import { SiPowerpages } from "react-icons/si";
import { Link } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiChevronsRight } from "react-icons/fi";
import { SidebarLinksForUsed, SidebarLinkType } from "../../sidebar/Sidebar";

// type PageData = {
//   id: number;
//   pagename: string;
// };

const MyParts: React.FC = () => {
  // const Pages: PageData[] = [
  //   { id: 1, pagename: "Hero" },
  //   { id: 2, pagename: "Gördüyümüz işlər" },
  //   { id: 3, pagename: "Biz kimik" },
  //   { id: 4, pagename: "Kartlar" },
  //   { id: 5, pagename: "Sertifikatlar" },
  //   { id: 6, pagename: "Maillər" },
  // ];

  return (
    <section className="my-parts">
      <div className="toptitle">
        <h3>Sürətli Giriş</h3>
        <SiPowerpages className="page-icons" />
      </div>
      <div className="pages-maped">
        {SidebarLinksForUsed?.map((pages: SidebarLinkType, index: number) => (
          <Link to={pages?.to} className="page-link" key={index}>
            <div className="left">
              <IoDocumentTextOutline className="doc-icon" />
              <span>{pages?.title}</span>
            </div>
            <div className="right">
              <FiChevronsRight className="right-icon" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MyParts;
