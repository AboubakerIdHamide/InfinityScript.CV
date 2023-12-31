import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Body = () => {
    const {t} = useTranslation();
    const {auth} = useSelector(state => state);
    const targetUrl = auth.token ? 'dashboard/create-resume' : 'auth/login';
    return(
        <>
            <div className="flex flex-col items-center h-screen justify-center">
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">{t("home.your_path")} <span className='text-purple-500'>{t("home.starts")}</span> {t("home.here")}</h1>
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center w-3/4">{t("home.paragraph1")}</p>
                <Link href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-purple-600 rounded-lg hover:bg-black focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900" to={targetUrl}>
                {t("home.create_resume")}
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </Link>
            </div>
        </>
    )
};
export default Body;