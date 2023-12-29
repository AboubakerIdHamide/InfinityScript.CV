import { NavLink } from 'react-router-dom';
import { IoNewspaperOutline } from "react-icons/io5";
import { FaFileCirclePlus } from "react-icons/fa6";
import { LuFileStack } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { useTranslation } from 'react-i18next';

const SideBar = ({ isOpen, isPhone }) => {
    const { t } = useTranslation();
    const activeLink = "flex items-center p-2 rounded-lg bg-white group text-royal-purple mb-3 transition duration-75";
    const unactiveLink = "flex items-center p-2 hover:rounded-lg hover:bg-white group text-white hover:text-royal-purple mb-3 border-b-2 border-white transition duration-75";

    return (
        <aside id="default-sidebar" className={`fixed top-[10vh] left-0 ${isPhone ? "w-full" : "w-[200px]"} h-[90vh] transition-transform -translate-x-full ${isOpen ? "translate-x-0" : ""}`} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-royal-purple">
            <ul className="space-y-2 font-medium py-2">
            <NavLink to="new" className={({isActive})=>isActive ? activeLink: unactiveLink}>
                <IoNewspaperOutline className="w-5 h-5 transition duration-75"/>
                <span className="ms-3">{t('dashboard.new_templates')}</span>
            </NavLink>
            <NavLink to="create-resume/1/personal-info" className={({isActive})=>isActive ? activeLink: unactiveLink}>
                <FaFileCirclePlus className="w-5 h-5 transition duration-75"/>
                <span className="ms-3">{t('dashboard.create_resume')}</span>
            </NavLink>
            <NavLink to="my-resumes" className={({isActive})=>isActive ? activeLink: unactiveLink}>
                <LuFileStack className="w-5 h-5 transition duration-75"/>
                <span className="ms-3">{t('dashboard.my_resumes')}</span>
            </NavLink>
            <NavLink to="profile" className={({isActive})=>isActive ? activeLink: unactiveLink}>
                <CgProfile className="w-5 h-5 transition duration-75"/>
                <span className="ms-3">{t('dashboard.profile')}</span>
            </NavLink>
          </ul>
        </div>
      </aside>
  )
}
export default SideBar