import { FiLock } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const PasswordInput = ({password, setPassword}) => {
  const {t} = useTranslation();
    return(
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <FiLock color="white" />
          </div>
          <input type="password"  value={password} onChange={e=>setPassword(e.target.value)} id="password" className="bg-transparent border border-white text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("auth.password")}/>
        </div>
    )
}

export default PasswordInput