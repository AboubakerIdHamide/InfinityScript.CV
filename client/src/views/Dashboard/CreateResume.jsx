import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  PersonalInfo,
  Biography,
  Skills,
  Educations,
  Experiences,
} from "../../components/dashboard/createResume";
import { Logo } from "../../components/authPages";
import { Button } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { FaBook } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { PiFolderUserFill } from "react-icons/pi";

const CreateResume = () => {
  const { template_id } = useParams();
  const [tab, setTab] = useState(0);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [biography, setBiography] = useState(null);
  const [skills, setSkills] = useState(null);
  const [educations, setEducations] = useState(null);
  const [experiences, setExperiences] = useState(null);
  const { t } = useTranslation();
  
  const link_style = "flex justify-start items-center py-[1px] bg-white group text-royal-purple mb-3 transition duration-75";
  const activelink_style = "w-[80%] rounded-lg";
  const inactivelink_style = "w-full rounded-[0]";

  const tabs = [
    <PersonalInfo key={0} personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />,
    <Biography key={1} biography={biography} setBiography={setBiography} />,
    <Skills key={2} skills={skills} setSkills={setSkills} />,
    <Educations key={3} educations={educations} setEducations={setEducations}/>,
    <Experiences key={4} experiences={experiences} setExperiences={setExperiences}/>,
  ];

  return (
    <div className="bg-white w-full h-full rounded-[10px] flex overflow-y-scroll">
      <div className="basis-1/5 bg-royal-purple flex flex-col justify-start items-center">
        <div className="p-4 mb-3">
          <Logo />
        </div>
        <Button className={`${link_style} ${tab != 0 ? activelink_style : inactivelink_style}`}>
          <FaUser className="me-3"/>
          <span>{t("dashboard.personal_info")}</span>
        </Button>
        <Button className={`${link_style} ${tab != 1 ? activelink_style : inactivelink_style}`}>
          <TiDocumentText className="me-3"/>
          <span>{t("dashboard.biography")}</span>
        </Button>
        <Button className={`${link_style} ${tab != 2 ? activelink_style : inactivelink_style}`}>
          <FaBook  className="me-3"/>
          <span>{t("dashboard.education")}</span>
        </Button>
        <Button className={`${link_style} ${tab != 3 ? activelink_style : inactivelink_style}`}>
          <CiBoxList  className="me-3"/>
          <span>{t("dashboard.skills")}</span>
        </Button>
        <Button className={`${link_style}  ${tab != 4 ? activelink_style : inactivelink_style}`}>
          <PiFolderUserFill  className="me-3"/>
          <span>{t("dashboard.experience")}</span>
        </Button>
      </div>
      <div className="basis-4/5">

      </div>
    </div>
  )
}

export default CreateResume