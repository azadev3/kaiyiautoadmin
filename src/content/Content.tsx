import React from "react";
import MyParts from "./uitils/MyParts";
import ChartLengths from "./uitils/ChartLengths";
import ChartOthers from "./uitils/ChartOthers";
import { Route, Routes } from "react-router-dom";
import Logo from "../routes/topheader/Logo";
import Location from "../routes/topheader/Location";
import Telephone from "../routes/topheader/Telephone";
import Hero from "../routes/Hero";
import Design from "../routes/tabs/Design";
import Interier from "../routes/tabs/Interier";
import Comfortable from "../routes/tabs/Comfortable";
import Security from "../routes/tabs/Security";
import View from "../routes/tabs/View";
import Models from "../routes/tabs/Models";
import News from "../routes/tabs/News";
import SubscribtionNews from "../routes/SubscribtionNews";
import BecomeDealer from "../routes/BecomeDealer";
import Translates from "../routes/Translates";
import AddCity from "../routes/findsalesno/AddCity";
import ModelVideoTab from "../routes/modelinner/ModelVideoTab";
import ModelDesignTab from "../routes/modelinner/ModelDesignTab";
import ModelInerierTab from "../routes/modelinner/ModelInerierTab";
import ModelComforTab from "../routes/modelinner/ModelComforTab";
import ModelSecTab from "../routes/modelinner/ModelSecTab";
import TestDriveRegister from "../routes/testdriveregister/TestDriveRegister";
import TestDriveUsers from "../routes/testdriveregister/TestDriveUsers";
import CorporateCustomers from "../routes/forcorporatecustomers/CorporateCustomers";
import OurAdvantages from "../routes/ouradvantages/OurAdvantages";
import CorporateCustomersRegisters from "../routes/forcorporatecustomers/CorporateCustomersRequests";
import GuaranteHero from "../routes/kaiyiguarantee/GuaranteHero";
import GuarantDescription from "../routes/kaiyiguarantee/GuarantDescription";
import GuarantAttention from "../routes/kaiyiguarantee/GuarantAttention";
import TrafficRulesHero from "../routes/trafficrules/TrafficRulesHero";
import TrafficRulesCall from "../routes/trafficrules/TrafficRulesCall";
import TrafficRulesHelped from "../routes/trafficrules/TrafficRulesHelped";
import TrafficRulesBottom from "../routes/trafficrules/TrafficRulesBottom";
import RepairHero from "../routes/repair/RepairHero";
import RepairRulesDownload from "../routes/repair/RepairRulesDownload";
import KaiyiHistoryHero from "../routes/historykaiyi/KaiyiHistoryHero";
import KaiyiHistoryBottom from "../routes/historykaiyi/KaiyiHistoryBottom";
import KaiyiHistoryBlogs from "../routes/historykaiyi/KaiyiHistroyBlogs";
import KaiyiHistoryNews from "../routes/historykaiyi/KaiyiHistoryNews";
import KaiyiContactHero from "../routes/kaiyicontact/KaiyiContactHero";
import KaiyiContactFeedback from "../routes/kaiyicontact/KaiyiContactFeedback";
import AddDealer from "../routes/findsalesno/AddDealer";
import DealerContacts from "../routes/findsalesno/DealerContacts";
import AddCar from "../routes/addcar/AddCar";
import ModelPdf from "../routes/modelinner/ModelPdf";
import AddSocials from "../routes/addsocials/AddSocials";
import ContactManager from "../routes/contactmanager/ContactManager";
import Login from "../login/Login";
import NotFound from "../NotFound";

const Content: React.FC = () => {
  return (
    <div className="content">
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <div className="chart-section">
                <div className="left-chart">
                  <ChartLengths />
                </div>
                <div className="right-chart">
                  <ChartOthers />
                </div>
              </div>
              <div className="top-section">
                <MyParts />
                {/* <LastOperations /> */}
              </div>
            </React.Fragment>
          }
        />

        {/* Top header */}
        <Route path="/logo" element={<Logo />} />
        <Route path="/location" element={<Location />} />
        <Route path="/telephone" element={<Telephone />} />
        {/* hero */}
        <Route path="/hero" element={<Hero />} />
        {/* tabs on homepage */}
        {/* design */}
        <Route path="/designtab" element={<Design />} />
        {/* interier */}
        <Route path="/interiertab" element={<Interier />} />
        {/* security */}
        <Route path="/securitytab" element={<Security />} />
        {/* view */}
        <Route path="/viewtab" element={<View />} />
        {/* comfortable */}
        <Route path="/comfortabletab" element={<Comfortable />} />
        {/* models */}
        <Route path="/modelstab" element={<Models />} />
        {/* news blogs */}
        <Route path="/newstab" element={<News />} />
        {/* subscribtion emails */}
        <Route path="/subscribtionNews" element={<SubscribtionNews />} />
        {/* become dealer */}
        <Route path="/become-dealer" element={<BecomeDealer />} />
        {/* translates */}
        <Route path="/translates" element={<Translates />} />
        {/* find sales no */}
        <Route path="/findsales" element={<AddCity />} />
        <Route path="/add-dealer" element={<AddDealer />} />
        <Route path="/dealer-contacts" element={<DealerContacts />} />
        {/* models inner tabs route */}
        <Route path="/modelvideotab" element={<ModelVideoTab />} />
        <Route path="/modeldesigntab" element={<ModelDesignTab />} />
        <Route path="/modelinteriertab" element={<ModelInerierTab />} />
        <Route path="/modelcomfortab" element={<ModelComforTab />} />
        <Route path="/modelsectab" element={<ModelSecTab />} />
        <Route path="/modelpdf" element={<ModelPdf />} />
        {/* test drive register */}
        <Route path="/test-drive-hero" element={<TestDriveRegister />} />
        <Route path="/test-drive-registers" element={<TestDriveUsers />} />
        {/* corporate customers and our advantages */}
        <Route path="/for-corporate-customers" element={<CorporateCustomers />} />
        <Route path="/our-advantages" element={<OurAdvantages />} />
        <Route path="/for-corporate-requests" element={<CorporateCustomersRegisters />} />
        {/* KAIYI Guarantee service */}
        <Route path="/kaiyi-guarante-hero" element={<GuaranteHero />} />
        <Route path="/kaiyi-guarante-description" element={<GuarantDescription />} />
        <Route path="/kaiyi-guarante-attention" element={<GuarantAttention />} />
        {/* Traffic rules road rules */}
        <Route path="/traffic-rules-hero" element={<TrafficRulesHero />} />
        <Route path="/traffic-rules-call" element={<TrafficRulesCall />} />
        <Route path="/traffic-rules-helped" element={<TrafficRulesHelped />} />
        <Route path="/traffic-rules-bottom" element={<TrafficRulesBottom />} />
        {/* Repair and Maintenance */}
        <Route path="/repair-hero" element={<RepairHero />} />
        <Route path="/repair-rules-download" element={<RepairRulesDownload />} />
        {/* EY KAIYI */}
        <Route path="/kaiyi-history-hero" element={<KaiyiHistoryHero />} />
        <Route path="/kaiyi-history-bottom" element={<KaiyiHistoryBottom />} />
        <Route path="/kaiyi-history-blogs" element={<KaiyiHistoryBlogs />} />
        <Route path="/kaiyi-history-news" element={<KaiyiHistoryNews />} />
        {/* CONTACT KAIYI */}
        <Route path="/kaiyi-contact-hero" element={<KaiyiContactHero />} />
        <Route path="/kaiyi-contact-feedback" element={<KaiyiContactFeedback />} />
        {/* ADD CAR */}
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/add-socials" element={<AddSocials />} />
        <Route path="/contact-manager" element={<ContactManager />} />
      </Routes>
    </div>
  );
};

export default Content;
