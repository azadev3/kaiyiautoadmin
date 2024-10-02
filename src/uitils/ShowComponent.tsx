import React from "react";
import { useLocation } from "react-router-dom";
import LogoShow from "../cruds/logo/LogoShow";
import LocationShow from "../cruds/location/LocationShow";
import TelephoneShow from "../cruds/telephone/TelephoneShow";
import HeroShow from "../cruds/hero/HeroShow";
import DesignShow from "../cruds/tabs/designc/DesignShow";
import InterierShow from "../cruds/tabs/interier/InterierShow";
import ComfortableShow from "../cruds/tabs/comfortable/ComfortableShow";
import SecurityShow from "../cruds/tabs/securityc/SecurityShow";
import ViewShow from "../cruds/tabs/viewc/ViewShow";
import ModelsShow from "../cruds/tabs/modelsc/ModelsShow";
import NewsShow from "../cruds/tabs/news/NewsShow";
import SubsNewsShow from "../cruds/subscribtionsnews/SubsNewsShow";
import DealerTabShow from "../cruds/becomedealer/DealerTabShow";
import TranslatesShow from "../cruds/translates/TranslatesShow";
import AddCityShow from "../cruds/addcity/AddCityShow";
import ModelVideoShow from "../cruds/modelinnertabs/modelvideotab/ModelVideoShow";
import ModelDesignShow from "../cruds/modelinnertabs/modeldesigntab/ModelDesignShow";
import ModelInterierShow from "../cruds/modelinnertabs/modelinteriertab/ModelInterierShow";
import ModelComfortShow from "../cruds/modelinnertabs/modelcomfortab/ModelComfortShow";
import ModelSecTabShow from "../cruds/modelinnertabs/modelsectab/ModelSecTabShow";
import TestDriveShow from "../cruds/testdriveregister/TestDriveShow";
import FCHeroShow from "../cruds/forcorporatecustomers/FCHeroShow";
import OurAdvantagesShow from "../cruds/ouradvantages/OurAdvantagesShow";
import GuarantHeroShow from "../cruds/kaiyiguarantee/heroguarant/GuarantHeroShow";
import GuarantDescriptionShow from "../cruds/kaiyiguarantee/guarantdescription/GuarantDescriptionShow";
import GuarantAttentionShow from "../cruds/kaiyiguarantee/guarantattention/GuarantAttentionShow";
import TrafficRulesHeroShow from "../cruds/trafficrules/trafficruleshero/TrafficRulesHeroShow";
import CallShow from "../cruds/trafficrules/trafficrulescall/CallShow";
import TrafficRulesHelpedShow from "../cruds/trafficrules/trafficruleshelped/TrafficRulesHelpedShow";
import TrafficRulesBottomShow from "../cruds/trafficrules/trafficrulesbottom/TrafficRulesBottomShow";
import RepairHeroShow from "../cruds/repair/RepairHeroShow";
import KaiyiHistoryHeroShow from "../cruds/kaiyihistory/kaiyihistoryhero/KaiyiHistoryHeroShow";
import KaiyiHistoryBottomShow from "../cruds/kaiyihistory/kaiyihistorybottom/KaiyiHistoryBottomShow";
import KaiyiBlogShow from "../cruds/kaiyihistory/kaiyiblogs/KaiyiBlogShow";
import KaiyiNewsShow from "../cruds/kaiyihistory/kaiyinews/KaiyiNewsShow";
import ContactHeroShow from "../cruds/kaiyicontact/contacthero/ContactHeroShow";
import AddDealerShow from "../cruds/adddealer/AddDealerShow";
import AddCarShow from "../cruds/addcar/AddCarShow";
import ModelPdfShow from "../cruds/modelinnertabs/modelpdf/ModelPdfShow";
import RepairRulesDownloadShow from "../cruds/repairrulesdownload/RepairRulesDownloadShow";
import AddSocialShow from "../cruds/addsocials/AddSocialShow";

const ShowComponent: React.FC = () => {
  const location = useLocation();

  const renderComponent = () => {
    switch (location.pathname) {
      case "/logo":
        return <LogoShow />;
      case "/location":
        return <LocationShow />;
      case "/telephone":
        return <TelephoneShow />;
      case "/hero":
        return <HeroShow />;
      case "/designtab":
        return <DesignShow />;
      case "/interiertab":
        return <InterierShow />;
      case "/comfortabletab":
        return <ComfortableShow />;
      case "/securitytab":
        return <SecurityShow />;
      case "/viewtab":
        return <ViewShow />;
      case "/modelstab":
        return <ModelsShow />;
      case "/newstab":
        return <NewsShow />;
      case "/subscribtionNews":
        return <SubsNewsShow />;
      case "/become-dealer":
        return <DealerTabShow />;
      case "/translates":
        return <TranslatesShow />;
      case "/findsales":
        return <AddCityShow />;
      case "/modelvideotab":
        return <ModelVideoShow />;
      case "/modeldesigntab":
        return <ModelDesignShow />;
      case "/modelinteriertab":
        return <ModelInterierShow />;
      case "/modelcomfortab":
        return <ModelComfortShow />;
      case "/modelsectab":
        return <ModelSecTabShow />;
      case "/test-drive-hero":
        return <TestDriveShow />;
      case "/for-corporate-customers":
        return <FCHeroShow />;
      case "/our-advantages":
        return <OurAdvantagesShow />;
      case "/kaiyi-guarante-hero":
        return <GuarantHeroShow />;
      case "/kaiyi-guarante-description":
        return <GuarantDescriptionShow />;
      case "/kaiyi-guarante-attention":
        return <GuarantAttentionShow />;
      case "/traffic-rules-hero":
        return <TrafficRulesHeroShow />;
      case "/traffic-rules-call":
        return <CallShow />;
      case "/traffic-rules-helped":
        return <TrafficRulesHelpedShow />;
      case "/traffic-rules-bottom":
        return <TrafficRulesBottomShow />;
      case "/repair-hero":
        return <RepairHeroShow />;
      case "/repair-rules-download":
        return <RepairRulesDownloadShow />;
      case "/kaiyi-history-hero":
        return <KaiyiHistoryHeroShow />;
      case "/kaiyi-history-bottom":
        return <KaiyiHistoryBottomShow />;
      case "/kaiyi-history-blogs":
        return <KaiyiBlogShow />;
      case "/kaiyi-history-news":
        return <KaiyiNewsShow />;
      case "/kaiyi-contact-hero":
        return <ContactHeroShow />;
      case "/add-dealer":
        return <AddDealerShow />;
      case "/add-car":
        return <AddCarShow />;
      case "/modelpdf":
        return <ModelPdfShow />;
      case "/add-socials":
        return <AddSocialShow />;
      default:
        return <div>Bu rotada component mövcud deyil.</div>;
    }
  };
  return <div className="show-component">{renderComponent()}</div>;
};

export default ShowComponent;
