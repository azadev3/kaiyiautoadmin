import React from "react";
import LogoEdit from "../cruds/logo/LogoEdit";
import LocationEdit from "../cruds/location/LocationEdit";
import TelephoneEdit from "../cruds/telephone/TelephoneEdit";
import HeroEdit from "../cruds/hero/HeroEdit";
import DesignEdit from "../cruds/tabs/designc/DesignEdit";
import InterierEdit from "../cruds/tabs/interier/InterierEdit";
import ComfortableEdit from "../cruds/tabs/comfortable/ComfortableEdit";
import SecurityEdit from "../cruds/tabs/securityc/SecurityEdit";
import ViewEdit from "../cruds/tabs/viewc/ViewEdit";
import ModelsEdit from "../cruds/tabs/modelsc/ModelsEdit";
import NewsEdit from "../cruds/tabs/news/NewsEdit";
import DealerTabEdit from "../cruds/becomedealer/DealerTabEdit";
import AddCityEdit from "../cruds/addcity/AddCityEdit";
import ModelVideoEdit from "../cruds/modelinnertabs/modelvideotab/ModelVideoEdit";
import ModelDesignEdit from "../cruds/modelinnertabs/modeldesigntab/ModelDesignEdit";
import ModelInterierEdit from "../cruds/modelinnertabs/modelinteriertab/ModelInterierEdit";
import ModelComfortEdit from "../cruds/modelinnertabs/modelcomfortab/ModelComfortEdit";
import ModelSecTabEdit from "../cruds/modelinnertabs/modelsectab/ModelSecTabEdit";
import TestDriveEdit from "../cruds/testdriveregister/TestDriveEdit";
import FCHeroEdit from "../cruds/forcorporatecustomers/FCHeroEdit";
import OurAdvantagesEdit from "../cruds/ouradvantages/OurAdvantagesEdit";
import GuarantHeroEdit from "../cruds/kaiyiguarantee/heroguarant/GuarantHeroEdit";
import GuarantDescriptionEdit from "../cruds/kaiyiguarantee/guarantdescription/GuarantDescriptionEdit";
import GuarantAttentionEdit from "../cruds/kaiyiguarantee/guarantattention/GuarantAttentionEdit";
import TrafficRulesHeroEdit from "../cruds/trafficrules/trafficruleshero/TrafficRulesHeroEdit";
import CallEdit from "../cruds/trafficrules/trafficrulescall/CallEdit";
import TrafficRulesHelpedEdit from "../cruds/trafficrules/trafficruleshelped/TrafficRulesHelpedEdit";
import TrafficRulesBottomEdit from "../cruds/trafficrules/trafficrulesbottom/TrafficRulesBottomEdit";
import RepairHeroEdit from "../cruds/repair/RepairHeroEdit";
import KaiyiHistoryHeroEdit from "../cruds/kaiyihistory/kaiyihistoryhero/KaiyiHistoryHeroEdit";
import KaiyiHistoryBottomEdit from "../cruds/kaiyihistory/kaiyihistorybottom/KaiyiHistoryBottomEdit";
import KaiyiBlogEdit from "../cruds/kaiyihistory/kaiyiblogs/KaiyiBlogEdit";
import KaiyiNewsEdit from "../cruds/kaiyihistory/kaiyinews/KaiyiNewsEdit";
import ContactHeroEdit from "../cruds/kaiyicontact/contacthero/ContactHeroEdit";
import AddDealerEdit from "../cruds/adddealer/AddDealerEdit";
import AddCarEdit from "../cruds/addcar/AddCarEdit";
import ModelPdfEdit from "../cruds/modelinnertabs/modelpdf/ModelPdfEdit";
import RepairRulesDownloadEdit from "../cruds/repairrulesdownload/RepairRulesDownloadEdit";
import AddSocialEdit from "../cruds/addsocials/AddSocialEdit";

const RefreshComponent: React.FC = () => {
  const renderComponent = () => {
    switch (location.pathname) {
      case "/logo":
        return <LogoEdit />;
      case "/location":
        return <LocationEdit />;
      case "/telephone":
        return <TelephoneEdit />;
      case "/hero":
        return <HeroEdit />;
      case "/designtab":
        return <DesignEdit />;
      case "/interiertab":
        return <InterierEdit />;
      case "/comfortabletab":
        return <ComfortableEdit />;
      case "/securitytab":
        return <SecurityEdit />;
      case "/viewtab":
        return <ViewEdit />;
      case "/modelstab":
        return <ModelsEdit />;
      case "/newstab":
        return <NewsEdit />;
      case "/become-dealer":
        return <DealerTabEdit />;
      // case "/translates":
      //   return <TranslatesEdit />;
      case "/findsales":
        return <AddCityEdit />;
      case "/modelvideotab":
        return <ModelVideoEdit />;
      case "/modeldesigntab":
        return <ModelDesignEdit />;
      case "/modelinteriertab":
        return <ModelInterierEdit />;
      case "/modelcomfortab":
        return <ModelComfortEdit />;
      case "/modelsectab":
        return <ModelSecTabEdit />;
      case "/test-drive-hero":
        return <TestDriveEdit />;
      case "/for-corporate-customers":
        return <FCHeroEdit />;
      case "/our-advantages":
        return <OurAdvantagesEdit />;
      case "/kaiyi-guarante-hero":
        return <GuarantHeroEdit />;
      case "/kaiyi-guarante-description":
        return <GuarantDescriptionEdit />;
      case "/kaiyi-guarante-attention":
        return <GuarantAttentionEdit />;
      case "/traffic-rules-hero":
        return <TrafficRulesHeroEdit />;
      case "/traffic-rules-call":
        return <CallEdit />;
      case "/traffic-rules-helped":
        return <TrafficRulesHelpedEdit />;
      case "/traffic-rules-bottom":
        return <TrafficRulesBottomEdit />;
      case "/repair-hero":
        return <RepairHeroEdit />;
      case "/repair-rules-download":
        return <RepairRulesDownloadEdit />;
      case "/kaiyi-history-hero":
        return <KaiyiHistoryHeroEdit />;
      case "/kaiyi-history-bottom":
        return <KaiyiHistoryBottomEdit />;
      case "/kaiyi-history-blogs":
        return <KaiyiBlogEdit />;
      case "/kaiyi-history-news":
        return <KaiyiNewsEdit />;
      case "/kaiyi-contact-hero":
        return <ContactHeroEdit />;
      case "/add-dealer":
        return <AddDealerEdit />;
      case "/add-car":
        return <AddCarEdit />;
      case "/modelpdf":
        return <ModelPdfEdit />;
      case "/add-socials":
        return <AddSocialEdit />;
      default:
        return <div>Bu rotada component mövcud deyil.</div>;
    }
  };

  return <div className="add-component">{renderComponent()}</div>;
};

export default RefreshComponent;
