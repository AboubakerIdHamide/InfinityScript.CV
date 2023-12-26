import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { SideBar, Steper } from "../../components/dashboard/createResume";
import { Button } from "flowbite-react";
import { CREATE_CV_ROUTES } from "../../utils/constants";

const CreateResume = () => {
  const { template_id } = useParams();
  const [tab, setTab] = useState({ index: 0, title: "dashboard.personal_info" });
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  
  const context = {
    tab,
    setTab,
    userInfo,
    setUserInfo,
  };

  const prevStep = () => {
    navigate(CREATE_CV_ROUTES[tab.index - 1]);
  };

  const nextStep = () => {
    navigate(CREATE_CV_ROUTES[tab.index + 1]);
    console.log(userInfo);
  };

  return (
    <div className="bg-white w-full h-full rounded-[10px] flex overflow-y-scroll">
      <SideBar/>
      <div className="w-full md:h-full md:basis-4/5 flex flex-col justify-start items-center">
        <Steper tab={tab}/>
        <Outlet context={context} />
        <div className="w-[90%] h-[50px] flex justify-end gap-[15px] my-4 pb-[10px]">
          <Button disabled={tab.index == 0} onClick={prevStep} className="text-royal-purple border-royal-purple">Prev</Button>
          <Button disabled={tab.index == CREATE_CV_ROUTES.length - 1} onClick={nextStep} className="bg-royal-purple border-royal-purple">Next</Button>
        </div>
      </div>
    </div>
  )
}

export default CreateResume