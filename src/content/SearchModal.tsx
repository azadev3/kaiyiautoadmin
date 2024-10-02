import React, { ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { useRecoilState } from "recoil";
import { SearchModalState } from "../recoil/atoms";
import { SidebarLinksForUsed, SidebarLinkType } from "../sidebar/Sidebar";
import SidebarLink from "../sidebar/SidebarLink";

// Highlight searched text in results
const HighlightedText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }

  const parts = text.split(new RegExp(`(${highlight})`, "i"));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? <mark key={index}>{part}</mark> : part
      )}
    </>
  );
};

const SearchModal: React.FC = () => {
  const [_, setSearchModal] = useRecoilState(SearchModalState);
  const modalRef = React.useRef<HTMLDivElement | null>(null);

  const [searchItems, setSearchItems] = React.useState<string>("");
  const [searchedItems, setSearchedItems] = React.useState<any[]>([]);

  const outsideClick = (e: MouseEvent) => {
    if (modalRef?.current && !modalRef.current.contains(e.target as Node)) {
      setSearchModal(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", outsideClick);
    return () => document.removeEventListener("mousedown", outsideClick);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchItems(inputValue);

    if (inputValue) {
      const hasVals = SidebarLinksForUsed?.find((link: SidebarLinkType) =>
        link?.title?.toLowerCase()?.includes(inputValue.toLowerCase())
      );

      const hasDropdownVals = SidebarLinksForUsed?.flatMap((items: SidebarLinkType) =>
        items?.dropdownItems?.filter((item: any) => item?.title?.toLowerCase()?.includes(inputValue.toLowerCase()))
      );

      const flattedVals = [hasVals, ...hasDropdownVals].filter(Boolean);
      setSearchedItems(flattedVals);
    }
  };

  const isSearched = searchItems && searchItems.length > 0;

  return (
    <div className="search-modal" ref={modalRef}>
      <div className="head">
        <h2>Paneldə axtar</h2>
        <IoIosClose className="close-icon" onClick={() => setSearchModal(false)} />
      </div>
      <div className="input-area">
        <CiSearch className="search-icon" />
        <input type="text" placeholder="Axtar..." onChange={handleChange} />
      </div>

      <div className="searched-items-container">
        {isSearched && searchedItems.length > 0
          ? searchedItems.map((item: SidebarLinkType, index: number) => (
              <SidebarLink
                key={index}
                title={<HighlightedText text={item.title} highlight={searchItems} />}
                to={item.to}
                activeLinkIcon={item.activeLinkIcon}
                isDropdown={item.isDropdown}
                dropdownItems={item.dropdownItems}
              />
            ))
          : SidebarLinksForUsed.map((link, index) => (
              <SidebarLink
                key={index}
                title={<HighlightedText text={link.title} highlight={searchItems} />}
                to={link.to}
                activeLinkIcon={link.activeLinkIcon}
                isDropdown={link.isDropdown}
                dropdownItems={link.dropdownItems}
              />
            ))}
      </div>
    </div>
  );
};

export default SearchModal;
