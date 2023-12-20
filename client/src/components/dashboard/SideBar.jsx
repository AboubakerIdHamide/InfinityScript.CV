
import { Link } from 'react-router-dom';
import { IoNewspaperOutline } from "react-icons/io5";
import { FaFileCirclePlus } from "react-icons/fa6";
import { LuFileStack } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { useTranslation } from 'react-i18next';

const SideBar = ({ isOpen }) => {
    const { t } = useTranslation();

    return (
        <aside id="default-sidebar" className={`fixed top-[10vh] left-0 w-[200px] h-[90vh] transition-transform -translate-x-full ${isOpen ? "translate-x-0" : ""}`} aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-royal-purple">
            <ul className="space-y-2 font-medium py-2">
            <Link to="">
                <span className="flex items-center p-2 hover:rounded-lg hover:bg-white group text-white hover:text-royal-purple mb-3 border-b-2 border-white transition duration-75">
                    <IoNewspaperOutline className="w-5 h-5 transition duration-75"/>
                    <span className="ms-3">{t('dashboard.new_templates')}</span>
                </span>
            </Link>
            <Link to="create-resume">
                <span className="flex items-center p-2 hover:rounded-lg hover:bg-white group text-white hover:text-royal-purple mb-3 border-b-2 border-white transition duration-75">
                    <FaFileCirclePlus className="w-5 h-5 transition duration-75"/>
                    <span className="ms-3">{t('dashboard.create_resume')}</span>
                </span>
            </Link>
            <Link to="my-resumes" >
                <span className="flex items-center p-2 hover:rounded-lg hover:bg-white group text-white hover:text-royal-purple mb-3 border-b-2 border-white transition duration-75">
                    <LuFileStack className="w-5 h-5 transition duration-75"/>
                    <span className="ms-3">{t('dashboard.my_resumes')}</span>
                </span>
            </Link>
            <Link to="profile">
                <span className="flex items-center p-2 hover:rounded-lg hover:bg-white group text-white hover:text-royal-purple mb-3 border-b-2 border-white transition duration-75">
                    <CgProfile className="w-5 h-5 transition duration-75"/>
                    <span className="ms-3">{t('dashboard.profile')}</span>
                </span>
            </Link>
          </ul>
        </div>
      </aside>
  )
}
export default SideBar