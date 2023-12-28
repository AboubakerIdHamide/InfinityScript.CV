import { Outlet, useNavigate } from "react-router-dom";
import { NavBar, SideBar} from '../../components/dashboard';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { SERVER_URL } from "../../utils/constants";
import { useQuery } from "react-query";
import { Loading } from "../../components/common";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPhone, setIsPhone] = useState(false);
  const [picture, setPicture] = useState("");
  const { lang } = useSelector(state => state.global);
  const { i18n } = useTranslation();
  const { auth, global } = useSelector(state => state);
  const navigate = useNavigate();

  useEffect(() => {
    const media = matchMedia('(max-width:767px)')
    if (media.matches) {
      setIsPhone(true)
      setIsOpen(false)
    }
    i18n.changeLanguage(lang);
  }, []);
  
  const { isLoading } = useQuery("verify-token", () => {
    return axios.get(`${SERVER_URL}/api/${global.lang}/users/${auth.user.id}/picture`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    }).then((res)=>res.data);
  },
    {
      onError: () => { 
        delete axios.defaults.headers.common["Authorization"];
        navigate("/auth/login");
      },
      onSuccess: (data) => {
        if (data.success) {
          setPicture(`${SERVER_URL}/${data.data.picture}`);
          axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
        } else {
          delete axios.defaults.headers.common["Authorization"];
          navigate("/auth/login");
        }
      }
    }
  );

  return (
    <>
      <NavBar setIsOpen={setIsOpen} isOpen={isOpen} picture={picture} />
      <div className="flex w-100 h-[90vh]">
          <SideBar isOpen={isOpen} isPhone={isPhone} />
          <div className={`${isOpen ? "translate-x-[200px] w-[calc(100vw-200px)]" : "w-full"} bg-gentle-sky p-[20px] ${isPhone && isOpen ? "hidden" : null}`}>
            {isLoading ? (<Loading />) :
            (
              <Outlet />
            )}
          </div>
      </div>
    </>
  )
}

export default Dashboard
