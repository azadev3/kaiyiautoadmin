import React from "react";
import "./styles/global.scss";
import "./styles/style.scss";
import Sidebar from "./sidebar/Sidebar";
import Content from "./content/Content";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { ComponentModalState, ComponentModalStateRefresh, ComponentModalStateRemove } from "./recoil/atoms";
import { useRecoilState } from "recoil";
import { CgClose } from "react-icons/cg";
import RefreshComponent from "./uitils/RefreshComponent";
import RemoveComponent from "./uitils/RemoveComponent";
import AddComponent from "./uitils/AddComponent";
import { ToastContainer, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const App: React.FC = () => {
  const [componentModal, setComponentModal] = useRecoilState(ComponentModalState);
  const [componentModalRefresh, setComponentModalRefresh] = useRecoilState(ComponentModalStateRefresh);
  const [componentModalRemove, setComponentModalRemove] = useRecoilState(ComponentModalStateRemove);

  return (
    <main className="app">
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
            <div className="search">
              <CiSearch className="search-icon" />
              <input type="search" placeholder="Birşey axtar..." />
            </div>
            <div className="settings">
              <img src="/settings.svg" alt="settings" />
            </div>
            <div className="user">
              <img src="/ad.jpeg" alt="profile" />
            </div>
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
  );
};

export default App;
