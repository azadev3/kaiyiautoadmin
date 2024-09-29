import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RxCaretDown } from "react-icons/rx";

type DropdownItems = {
  id: number;
  title: string;
  to: string;
};

type props = {
  title: string;
  to: string;
  activeLinkIcon?: any;
  isDropdown?: boolean;
  dropdownItems?: DropdownItems[];
};

const SidebarLink: React.FC<props> = (props) => {
  //open dropdown
  const [menu, setMenu] = React.useState<boolean>(false);
  const handleMenu = () => {
    setMenu((prev) => !prev);
  };

  //if location pathname equal the selected active link keep open menu refreshing page
  const location = useLocation();

  React.useEffect(() => {
    const isAnyLinkActive = props?.dropdownItems?.some((item: DropdownItems) => location?.pathname === item?.to);
    if (isAnyLinkActive) {
      setMenu(true);
    }
  }, [location, props?.dropdownItems]);

  return (
    <div className="link-area">
      {props.isDropdown ? (
        <div className="link-with-dropdown" onClick={handleMenu}>
          <div className="left">
            <span className="linkicon">{props.activeLinkIcon}</span>
            <span className="linkname">{props.title}</span>
          </div>
          <RxCaretDown className={`caret-down ${menu ? "active" : ""}`} />
        </div>
      ) : (
        <NavLink to={props?.to} className="link">
          <div className="left">
            <span className="linkicon">{props.activeLinkIcon}</span>
            <span className="linkname">{props.title}</span>
          </div>
        </NavLink>
      )}

      {/* menu */}
      <div className={`submenu ${menu ? "submenu-active" : ""}`}>
        {props.dropdownItems?.map((item: DropdownItems, i: number) => (
          <NavLink to={item?.to} className="link-submenu" key={i}>
            {item?.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLink;
