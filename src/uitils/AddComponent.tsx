import React from "react";
import { useLocation } from "react-router-dom";
import LogoCreate from "../cruds/logo/LogoCreate";
import LocationCreate from "../cruds/location/LocationCreate";
import TelephoneCreate from "../cruds/telephone/TelephoneCreate";
import HeroCreate from "../cruds/hero/HeroCreate";
import DesignCreate from "../cruds/tabs/designc/DesignCreate";
import InterierCreate from "../cruds/tabs/interier/InterierCreate";
import ComfortableCreate from "../cruds/tabs/comfortable/ComfortableCreate";
import SecurityCreate from "../cruds/tabs/securityc/SecurityCreate";
import ViewCreate from "../cruds/tabs/viewc/ViewCreate";
import ModelsCreate from "../cruds/tabs/modelsc/ModelsCreate";
import NewsCreate from "../cruds/tabs/news/NewsCreate";
import DealerTabCreate from "../cruds/becomedealer/DealerTabCreate";
import TranslatesCreate from "../cruds/translates/TranslatesCreate";
import AddCityCreate from "../cruds/addcity/AddCityCreate";
import ModelVideoCreate from "../cruds/modelinnertabs/modelvideotab/ModelVideoCreate";
import ModelDesignCreate from "../cruds/modelinnertabs/modeldesigntab/ModelDesignCreate";
import ModelInterierCreate from "../cruds/modelinnertabs/modelinteriertab/ModelInterierCreate";
import ModelComfortCreate from "../cruds/modelinnertabs/modelcomfortab/ModelComfortCreate";
import ModelSecTabCreate from "../cruds/modelinnertabs/modelsectab/ModelSecTabCreate";
import TestDriveCreate from "../cruds/testdriveregister/TestDriveCreate";
import FCHeroCreate from "../cruds/forcorporatecustomers/FCHeroCreate";
import OurAdvantagesCreate from "../cruds/ouradvantages/OurAdvantagesCreate";
import GuarantHeroCreate from "../cruds/kaiyiguarantee/heroguarant/GuarantHeroCreate";
import GuarantDescriptionCreate from "../cruds/kaiyiguarantee/guarantdescription/GuarantDescriptionCreate";
import GuarantAttentionCreate from "../cruds/kaiyiguarantee/guarantattention/GuarantAttentionCreate";
import TrafficRulesHeroCreate from "../cruds/trafficrules/trafficruleshero/TrafficRulesHeroCreate";
import CallCreate from "../cruds/trafficrules/trafficrulescall/CallCreate";
import TrafficRulesHelpedCreate from "../cruds/trafficrules/trafficruleshelped/TrafficRulesHelpedCreate";
import TrafficRulesBottomCreate from "../cruds/trafficrules/trafficrulesbottom/TrafficRulesBottomCreate";
import RepairHeroCreate from "../cruds/repair/RepairHeroCreate";
import RepairRulesDownloadCreate from "../cruds/repairrulesdownload/RepairRulesDownloadCreate";
import KaiyiHistoryHeroCreate from "../cruds/kaiyihistory/kaiyihistoryhero/KaiyiHistoryHeroCreate";
import KaiyiHistoryBottomCreate from "../cruds/kaiyihistory/kaiyihistorybottom/KaiyiHistoryBottomCreate";
import KaiyiBlogCreate from "../cruds/kaiyihistory/kaiyiblogs/KaiyiBlogCreate";
import KaiyiNewsCreate from "../cruds/kaiyihistory/kaiyinews/KaiyiNewsCreate";
import ContactHeroCreate from "../cruds/kaiyicontact/contacthero/ContactHeroCreate";
import AddDealerCreate from "../cruds/adddealer/AddDealerCreate";
import AddCarCreate from "../cruds/addcar/AddCarCreate";

const AddComponent: React.FC = () => {
  const location = useLocation();

  const renderComponent = () => {
    switch (location.pathname) {
      case "/logo":
        return <LogoCreate />;
      case "/location":
        return <LocationCreate />;
      case "/telephone":
        return <TelephoneCreate />;
      case "/hero":
        return <HeroCreate />;
      case "/designtab":
        return <DesignCreate />;
      case "/interiertab":
        return <InterierCreate />;
      case "/comfortabletab":
        return <ComfortableCreate />;
      case "/securitytab":
        return <SecurityCreate />;
      case "/viewtab":
        return <ViewCreate />;
      case "/modelstab":
        return <ModelsCreate />;
      case "/newstab":
        return <NewsCreate />;
      case "/become-dealer":
        return <DealerTabCreate />;
      case "/translates":
        return <TranslatesCreate />;
      case "/findsales":
        return <AddCityCreate />;
      case "/modelvideotab":
        return <ModelVideoCreate />;
      case "/modeldesigntab":
        return <ModelDesignCreate />;
      case "/modelinteriertab":
        return <ModelInterierCreate />;
      case "/modelcomfortab":
        return <ModelComfortCreate />;
      case "/modelsectab":
        return <ModelSecTabCreate />;
      case "/test-drive-hero":
        return <TestDriveCreate />;
      case "/for-corporate-customers":
        return <FCHeroCreate />;
      case "/our-advantages":
        return <OurAdvantagesCreate />;
      case "/kaiyi-guarante-hero":
        return <GuarantHeroCreate />;
      case "/kaiyi-guarante-description":
        return <GuarantDescriptionCreate />;
      case "/kaiyi-guarante-attention":
        return <GuarantAttentionCreate />;
      case "/traffic-rules-hero":
        return <TrafficRulesHeroCreate />;
      case "/traffic-rules-call":
        return <CallCreate />;
      case "/traffic-rules-helped":
        return <TrafficRulesHelpedCreate />;
      case "/traffic-rules-bottom":
        return <TrafficRulesBottomCreate />;
      case "/repair-hero":
        return <RepairHeroCreate />;
      case "/repair-rules-download":
        return <RepairRulesDownloadCreate />;
      case "/kaiyi-history-hero":
        return <KaiyiHistoryHeroCreate />;
      case "/kaiyi-history-bottom":
        return <KaiyiHistoryBottomCreate />;
      case "/kaiyi-history-blogs":
        return <KaiyiBlogCreate />;
      case "/kaiyi-history-news":
        return <KaiyiNewsCreate />;
      case "/kaiyi-contact-hero":
        return <ContactHeroCreate />;
      case "/add-dealer":
        return <AddDealerCreate />;
      case "/add-car":
        return <AddCarCreate />;
      default:
        return <div>Bu rotada component mövcud deyil.</div>;
    }
  };

  return <div className="add-component">{renderComponent()}</div>;
};

export default AddComponent;
