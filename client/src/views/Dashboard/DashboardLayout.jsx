import { Outlet } from "react-router-dom";
import { NavBar, SideBar} from '../../components/dashboard';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPhone, setIsPhone] = useState(false);
  const { lang } = useSelector(state => state.global);
  const { i18n } = useTranslation();
  const { auth } = useSelector(state => state);

  // Set default header for axios
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;  

  useEffect(() => {
    const media = matchMedia('(max-width:767px)')
    if (media.matches) {
      setIsPhone(true)
      setIsOpen(false)
    }
    i18n.changeLanguage(lang);
  }, []);

  return (
    <>
      <NavBar setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="flex w-100 h-[90vh]">
          <SideBar isOpen={isOpen} isPhone={isPhone} />
          <div className={`${isOpen ? "translate-x-[200px] w-[calc(100vw-200px)]" : "w-full"} bg-gentle-sky p-[20px] ${isPhone && isOpen ? "hidden" : null}`}>
            {<Outlet/>}
          </div>
      </div>
    </>
  )
}

export default Dashboard
