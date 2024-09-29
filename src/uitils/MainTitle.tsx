import React from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { useRecoilState } from "recoil";
import { ComponentModalState, ComponentModalStateRefresh, ComponentModalStateRemove } from "../recoil/atoms";
import { useLocation } from "react-router-dom";

type props = {
  children: React.ReactNode;
  msg: React.ReactNode;
};

const MainTitle: React.FC<props> = (props) => {
  const location = useLocation();

  const [dropdown, setDropdown] = React.useState<boolean>(false);

  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const btnRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      const hasBtnRef = btnRef?.current && !btnRef?.current?.contains(e.target as Node);
      const hasMenuRef = menuRef?.current && !menuRef?.current?.contains(e.target as Node);

      if (hasBtnRef && hasMenuRef) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    return () => document.removeEventListener("mousedown", outsideClicked);
  }, []);

  const [_, setComponentModal] = useRecoilState(ComponentModalState);
  const [__, setComponentModalRefresh] = useRecoilState(ComponentModalStateRefresh);
  const [___, setComponentModalRemove] = useRecoilState(ComponentModalStateRemove);

  return (
    <React.Fragment>
      <div className="titlemain">
        <div className="left">
          <h1>{props?.children}</h1>
          <div className="message">
            <IoIosInformationCircleOutline className="i" />
            <p>{props?.msg}</p>
          </div>
        </div>

        <div
          ref={btnRef}
          className="right"
          style={{
            background: dropdown ? "#cecece90" : "",
            display:
              location.pathname === "/subscribtionNews" ||
              location.pathname === "/test-drive-registers" ||
              location.pathname === "/for-corporate-requests"
                ? "none"
                : "",
          }}
          onClick={() => setDropdown((prev) => !prev)}>
          <VscSettings className="settings-icon" />
          <span>Parametrlər</span>
        </div>

        <div ref={menuRef} className={`dropdown-menu ${dropdown ? "active" : ""}`}>
          <button onClick={() => setComponentModal(true)}>Əlavə et</button>
          <button onClick={() => setComponentModalRefresh(true)}>Yenilə</button>
          <button onClick={() => setComponentModalRemove(true)}>Sil</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainTitle;
