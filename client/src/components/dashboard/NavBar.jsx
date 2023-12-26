import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { languages } from '../../utils/constants';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../store/reducers/auth';
import { setLanguage } from "../../store/reducers/global";
import { useNavigate } from 'react-router-dom';

const NavBar = ({ setIsOpen, isOpen, picture }) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { auth } = useSelector(state => state);



  const logout = () => {
    dispatch(setLogout());
    navigate("/auth/login");
  };
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    dispatch(setLanguage(e.target.value));
  };

  return (
    <Navbar fluid rounded className='h-[10vh]'>
      <Navbar.Brand href="/">
        <img src="/logo-no-background.png" className="mr-3 h-6 sm:h-9 scale-125" alt="InfinityScript.CV" />
        <span className="self-center text-royal-purple whitespace-nowrap text-xl font-semibold dark:text-white hidden sm:inline">InfinityScript.CV</span>
      </Navbar.Brand>
      <div className="flex">
        <select value={i18n.language} onChange={changeLanguage} className="font-mono text-royal-purple font-bold w-[106px] text-sm me-2 border-0 focus:ring-0">
          {languages.map((language, index) =>  (
                <option className='p-[10px]' key={index} value={language.code}>{language.name}</option>
            )
          )}
        </select>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={picture} rounded />
          }
        >
          <Dropdown.Header>
            <span className="block truncate text-sm font-medium">{ auth.user.email }</span>
          </Dropdown.Header>
          <Dropdown.Item>{ t("dashboard.settings") }</Dropdown.Item>
          <Dropdown.Item onClick={logout}>{ t("dashboard.logout") }</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle className='ms-2 bg-royal-purple hover:bg-white text-white hover:text-royal-purple' onClick={()=>setIsOpen(!isOpen)} />
      </div>
    </Navbar>
  )
}
export default NavBar