import React, { useState } from "react";
import { SiPowerpages } from "react-icons/si";
import { Link } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiChevronsRight } from "react-icons/fi";
import { SidebarLinksForUsed, SidebarLinkType } from "../../sidebar/Sidebar";

const MyParts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to filter pages based on search term
  const filteredPages = SidebarLinksForUsed.filter((page: SidebarLinkType) => {
    const matchesPageTitle = page.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDropdownItems =
      page.isDropdown &&
      page.dropdownItems?.some((item: any) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesPageTitle || matchesDropdownItems;
  });

  return (
    <section className="my-parts">
      <div className="toptitle">
        <h3>Sürətli Giriş</h3>
        <SiPowerpages className="page-icons" />
      </div>

      <div className="search-for-myparts">
        <input type="text" placeholder="Axtar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="pages-maped">
        {filteredPages.map((page: SidebarLinkType, index: number) =>
          page.isDropdown && page.dropdownItems ? (
            page?.dropdownItems
              .filter((dropdownItem: any) => dropdownItem.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((dropdownItem: any) => (
                <Link to={dropdownItem.to} className="page-link" key={`${index}-${dropdownItem.title}`}>
                  <div className="left">
                    <IoDocumentTextOutline className="doc-icon" />
                    <span>{dropdownItem.title}</span>
                  </div>
                  <div className="right">
                    <FiChevronsRight className="right-icon" />
                  </div>
                </Link>
              ))
          ) : (
            <Link to={page.to} className="page-link" key={index}>
              <div className="left">
                <IoDocumentTextOutline className="doc-icon" />
                <span>{page.title}</span>
              </div>
              <div className="right">
                <FiChevronsRight className="right-icon" />
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
};

export default MyParts;
