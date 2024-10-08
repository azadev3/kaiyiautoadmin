import React from "react";
import "./styles/global.scss";
import "./styles/style.scss";
import Sidebar from "./sidebar/Sidebar";
import Content from "./content/Content";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import {
  ComponentModalState,
  ComponentModalStateRefresh,
  ComponentModalStateRemove,
  IsAuthState,
  SearchModalState,
} from "./recoil/atoms";
import { useRecoilState } from "recoil";
import { CgClose } from "react-icons/cg";
import RefreshComponent from "./uitils/RefreshComponent";
import RemoveComponent from "./uitils/RemoveComponent";
import AddComponent from "./uitils/AddComponent";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchModal from "./content/SearchModal";
import Login from "./login/Login";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "./Loader";
import { TbLogout2 } from "react-icons/tb";
import "./styles/responsive.scss";
import DarkMode from "./content/DarkMode";

export const isToken = localStorage.getItem("kaiyi_adm_token");

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useRecoilState(IsAuthState);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (isToken && isToken.length > 0) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setLoading(false);
  }, []);

  const [searchModal, setSearchModal] = useRecoilState(SearchModalState);

  const [componentModal, setComponentModal] = useRecoilState(ComponentModalState);
  const [componentModalRefresh, setComponentModalRefresh] = useRecoilState(ComponentModalStateRefresh);
  const [componentModalRemove, setComponentModalRemove] = useRecoilState(ComponentModalStateRemove);

  //settings modal
  const [settingsModal, setSettingsModal] = React.useState<boolean>(false);
  const handleSettingsModal = () => {
    setSettingsModal((prev) => !prev);
  };

  //outside clicked
  const settingsModalRef = React.useRef<HTMLDivElement | null>(null);
  const settingsModalButtonRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const outsideClicked = (e: MouseEvent) => {
      const hasModalRef =
        settingsModalRef && settingsModalRef?.current && !settingsModalRef?.current?.contains(e.target as Node);
      const hasModalButtonRef =
        settingsModalButtonRef &&
        settingsModalButtonRef?.current &&
        !settingsModalButtonRef?.current?.contains(e.target as Node);

      if (hasModalRef && hasModalButtonRef) {
        setSettingsModal(false);
      }
    };

    document.addEventListener("mousedown", outsideClicked);
    return () => document.removeEventListener("mousedown", outsideClicked);
  }, []);

  //logout
  const handleLogOut = () => {
    localStorage.removeItem("kaiyi_adm_token");
    window.location.reload();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      {isAuth ? (
        <ProtectedRoute>
          <main className="app">
            <div className={`search-modal-overlay ${searchModal ? "active" : ""}`}>
              <SearchModal />
            </div>
            <ToastContainer style={{ zIndex: "100000" }} transition={Zoom} autoClose={1800} pauseOnHover={false} />
            <header className="overview-header-wrapper">
              <div className="header">
                <section className="left-head">
                  <Link to="/" className="logo">
                    <div className="image">
                      <img src="/166.svg" alt="166Tech" title="166Tech" />
                    </div>
                    <span className="logo-name">NurgunMotors.</span>
                  </Link>
                  <h2 className="route-name">Əsas</h2>
                </section>

                <section className="right-profile">
                  <div
                    className="search"
                    onClick={() => {
                      setSearchModal(true);
                    }}>
                    <CiSearch className="search-icon" />
                    <input type="search" placeholder="Birşey axtar..." />
                  </div>
                  <div className="settings" onClick={handleSettingsModal} ref={settingsModalButtonRef}>
                    <img src="/settings.svg" alt="settings" />
                  </div>
                  <div className={`settings-modal ${settingsModal ? "active" : ""}`} ref={settingsModalRef}>
                    <button className="log-out-btn" onClick={handleLogOut}>
                      <TbLogout2 className="logout" />
                      <span>Çıxış</span>
                    </button>
                  </div>
                  
                  <DarkMode />
                </section>
              </div>
            </header>
            <div className="admin">
              <Sidebar />
              <Content />
            </div>

            {/* EDIT MODAL */}
            <div className={`modal-overlay ${componentModal ? "active-modal" : ""}`}>
              <div className="modal-content">
                <div className="head-modal">
                  <h3>Əlavə et</h3>
                  <CgClose className="close" onClick={() => setComponentModal(false)} />
                </div>
                <AddComponent />
              </div>
            </div>

            {/* REFRESH MODAL */}
            <div className={`modal-overlay ${componentModalRefresh ? "active-modal" : ""}`}>
              <div className="modal-content">
                <div className="head-modal">
                  <h3>Yenilə</h3>
                  <CgClose className="close" onClick={() => setComponentModalRefresh(false)} />
                </div>
                <RefreshComponent />
              </div>
            </div>

            {/* REMOVE MODAL */}
            <div className={`modal-overlay ${componentModalRemove ? "active-modal" : ""}`}>
              <div className="modal-content">
                <div className="head-modal">
                  <h3>Sil</h3>
                  <CgClose className="close" onClick={() => setComponentModalRemove(false)} />
                </div>
                <RemoveComponent />
              </div>
            </div>
          </main>
        </ProtectedRoute>
      ) : (
        <Login />
      )}
    </React.Fragment>
  );
};

export default App;
