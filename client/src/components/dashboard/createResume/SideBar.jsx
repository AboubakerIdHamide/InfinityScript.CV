import { Logo } from "../../authPages";
import { FaUser } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { FaBook } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { PiFolderUserFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SideBar = () => {
    const { t } = useTranslation();
    const link_style = "flex justify-start items-center py-[8px] px-2 bg-white group text-royal-purple mb-3 transition duration-500";
    const activelink_style = "w-full rounded-[0]";
    const inactivelink_style = "w-[80%] rounded-lg";

    return (
        <div className="hidden md:basis-1/5 bg-royal-purple md:flex flex-col justify-start items-center">
            <div className="p-4 mb-3">
                <Logo />
            </div>
            <NavLink to="personal-info" className={({isActive})=>`${link_style} ${isActive ? activelink_style: inactivelink_style}`}>
                <FaUser className="me-3"/>
                <span>{t("dashboard.personal_info")}</span>
            </NavLink>
            <NavLink to="biography" className={({isActive})=>`${link_style} ${isActive ? activelink_style: inactivelink_style}`}>
                <TiDocumentText className="me-3"/>
                <span>{t("dashboard.biography")}</span>
            </NavLink>
            <NavLink to="educations" className={({isActive})=>`${link_style} ${isActive ? activelink_style: inactivelink_style}`}>
                <FaBook  className="me-3"/>
                <span>{t("dashboard.education")}</span>
            </NavLink>
            <NavLink to="skills" className={({isActive})=>`${link_style} ${isActive ? activelink_style: inactivelink_style}`}>
                <CiBoxList  className="me-3"/>
                <span>{t("dashboard.skills")}</span>
            </NavLink>
            <NavLink to="experiences" className={({isActive})=>`${link_style} ${isActive ? activelink_style: inactivelink_style}`}>
                <PiFolderUserFill  className="me-3"/>
                <span>{t("dashboard.experience")}</span>
            </NavLink>
        </div>
    )
}

export default SideBar