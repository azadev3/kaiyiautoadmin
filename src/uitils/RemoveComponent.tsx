import React from "react";
import LogoDelete from "../cruds/logo/LogoDelete";
import LocationDelete from "../cruds/location/LocationDelete";
import TelephoneDelete from "../cruds/telephone/TelephoneDelete";
import HeroDelete from "../cruds/hero/HeroDelete";
import DesignDelete from "../cruds/tabs/designc/DesignDelete";
import InterierDelete from "../cruds/tabs/interier/InterierDelete";
import ComfortableDelete from "../cruds/tabs/comfortable/ComfortableDelete";
import SecurityDelete from "../cruds/tabs/securityc/SecurityDelete";
import ViewDelete from "../cruds/tabs/viewc/ViewDelete";
import ModelsDelete from "../cruds/tabs/modelsc/ModelsDelete";
import NewsDelete from "../cruds/tabs/news/NewsDelete";
import DealerTabDelete from "../cruds/becomedealer/DealerTabDelete";
import TranslatesDelete from "../cruds/translates/TranslatesDelete";
import AddCityRemove from "../cruds/addcity/AddCityRemove";
import ModelVideoDelete from "../cruds/modelinnertabs/modelvideotab/ModelVideoDelete";
import ModelDesignDelete from "../cruds/modelinnertabs/modeldesigntab/ModelDesignDelete";
import ModelInterierDelete from "../cruds/modelinnertabs/modelinteriertab/ModelInterierDelete";
import ModelComfortDelete from "../cruds/modelinnertabs/modelcomfortab/ModelComfortDelete";
import ModelSecTabDelete from "../cruds/modelinnertabs/modelsectab/ModelSecTabDelete";
import TestDriveDelete from "../cruds/testdriveregister/TestDriveDelete";
import FCHeroDelete from "../cruds/forcorporatecustomers/FCHeroDelete";
import OurAdvantagesDelete from "../cruds/ouradvantages/OurAdvantagesDelete";
import GuarantHeroDelete from "../cruds/kaiyiguarantee/heroguarant/GuarantHeroDelete";
import GuarantDescriptionDelete from "../cruds/kaiyiguarantee/guarantdescription/GuarantDescriptionDelete";
import GuarantAttentionDelete from "../cruds/kaiyiguarantee/guarantattention/GuarantAttentionDelete";
import TrafficRulesHeroDelete from "../cruds/trafficrules/trafficruleshero/TrafficRulesHeroDelete";
import CallDelete from "../cruds/trafficrules/trafficrulescall/CallDelete";
import TrafficRulesHelpedDelete from "../cruds/trafficrules/trafficruleshelped/TrafficRulesHelpedDelete";
import TrafficRulesBottomDelete from "../cruds/trafficrules/trafficrulesbottom/TrafficRulesBottomDelete";
import RepairHeroDelete from "../cruds/repair/RepairHeroDelete";
import KaiyiHistoryHeroDelete from "../cruds/kaiyihistory/kaiyihistoryhero/KaiyiHistoryHeroDelete";
import KaiyiHistoryBottomDelete from "../cruds/kaiyihistory/kaiyihistorybottom/KaiyiHistoryBottomDelete";
import KaiyiBlogDelete from "../cruds/kaiyihistory/kaiyiblogs/KaiyiBlogDelete";
import KaiyiNewsDelete from "../cruds/kaiyihistory/kaiyinews/KaiyiNewsDelete";
import ContactHeroDelete from "../cruds/kaiyicontact/contacthero/ContactHeroDelete";
import AddDealerDelete from "../cruds/adddealer/AddDealerDelete";
import AddCarDelete from "../cruds/addcar/AddCarDelete";
import ModelPdfDelete from "../cruds/modelinnertabs/modelpdf/ModelPdfDelete";
import RepairRulesDownloadDelete from "../cruds/repairrulesdownload/RepairRulesDownloadDelete";
import AddSocialDelete from "../cruds/addsocials/AddSocialDelete";

const RemoveComponent: React.FC = () => {
  const renderComponent = () => {
    switch (location.pathname) {
      case "/logo":
        return <LogoDelete />;
      case "/location":
        return <LocationDelete />;
      case "/telephone":
        return <TelephoneDelete />;
      case "/hero":
        return <HeroDelete />;
      case "/designtab":
        return <DesignDelete />;
      case "/interiertab":
        return <InterierDelete />;
      case "/comfortabletab":
        return <ComfortableDelete />;
      case "/securitytab":
        return <SecurityDelete />;
      case "/viewtab":
        return <ViewDelete />;
      case "/modelstab":
        return <ModelsDelete />;
      case "/newstab":
        return <NewsDelete />;
      case "/become-dealer":
        return <DealerTabDelete />;
      case "/translates":
        return <TranslatesDelete />;
      case "/findsales":
        return <AddCityRemove />;
      case "/modelvideotab":
        return <ModelVideoDelete />;
      case "/modeldesigntab":
        return <ModelDesignDelete />;
      case "/modelinteriertab":
        return <ModelInterierDelete />;
      case "/modelcomfortab":
        return <ModelComfortDelete />;
      case "/modelsectab":
        return <ModelSecTabDelete />;
      case "/test-drive-hero":
        return <TestDriveDelete />;
      case "/for-corporate-customers":
        return <FCHeroDelete />;
      case "/our-advantages":
        return <OurAdvantagesDelete />;
      case "/kaiyi-guarante-hero":
        return <GuarantHeroDelete />;
      case "/kaiyi-guarante-description":
        return <GuarantDescriptionDelete />;
      case "/kaiyi-guarante-attention":
        return <GuarantAttentionDelete />;
      case "/traffic-rules-hero":
        return <TrafficRulesHeroDelete />;
      case "/traffic-rules-call":
        return <CallDelete />;
      case "/traffic-rules-helped":
        return <TrafficRulesHelpedDelete />;
      case "/traffic-rules-bottom":
        return <TrafficRulesBottomDelete />;
      case "/repair-hero":
        return <RepairHeroDelete />;
      case "/repair-rules-download":
        return <RepairRulesDownloadDelete />;
      case "/kaiyi-history-hero":
        return <KaiyiHistoryHeroDelete />;
      case "/kaiyi-history-bottom":
        return <KaiyiHistoryBottomDelete />;
      case "/kaiyi-history-blogs":
        return <KaiyiBlogDelete />;
      case "/kaiyi-history-news":
        return <KaiyiNewsDelete />;
      case "/kaiyi-contact-hero":
        return <ContactHeroDelete />;
      case "/add-dealer":
        return <AddDealerDelete />;
      case "/add-car":
        return <AddCarDelete />;
      case "/modelpdf":
        return <ModelPdfDelete />;
      case "/add-socials":
        return <AddSocialDelete />;
      default:
        return <div>Bu rotada component mövcud deyil.</div>;
    }
  };
  return <div className="add-component">{renderComponent()}</div>;
};

export default RemoveComponent;
