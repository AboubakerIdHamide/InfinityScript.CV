import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { SideBar, Steper } from "../../components/dashboard/createResume";
import { t } from "i18next";

const CreateResume = () => {
  const { template_id } = useParams();
  const [tab, setTab] = useState({ index: 1, title: t("dashboard.personal_info") });
  const [userInfo, setUserInfo] = useState(null);
  const context = {
    tab,
    setTab,
    userInfo,
    setUserInfo,
  };

  return (
    <div className="bg-white w-full h-full rounded-[10px] flex overflow-y-scroll">
      <SideBar/>
      <div className="basis-4/5 p-4 flex flex-col justify-start items-center">
        <Steper tab={tab}/>
        <Outlet context={context}/>
      </div>
    </div>
  )
}

export default CreateResume