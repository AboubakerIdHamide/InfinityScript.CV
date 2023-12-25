import { t } from 'i18next';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Input } from '../../common';

const PersonalInfo = () => {
  const { setTab, userInfo, setUserInfo } = useOutletContext();

  useEffect(() => {
    setTab({ index: 1, title: t("dashboard.personal_info") });
  }, []);

  return (
    <div className='w-[90%] h-full flex gap-[20px]'>
      <div className="h-[80%] flex flex-col basis-1/2 justify-evenly">
        <Input placeholder={"First Name"}/>
        <Input placeholder={"Last Name"}/>
        <Input placeholder={"Email"}/>
        <Input placeholder={"Phone Number"}/>
      </div>
      <div className="h-[80%] flex flex-col basis-1/2 justify-evenly">
        <Input placeholder={"Profession"}/>
        <Input placeholder={"Adress"}/>
        <Input placeholder={"LinkedIn Url"}/>
        <Input placeholder={"Website Url"}/>
      </div>
    </div>
  )
}

export default PersonalInfo