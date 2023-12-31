import { Link } from 'react-router-dom';
import { Carousel } from 'flowbite-react';
import { useTranslation } from 'react-i18next';

const Templates = () => {
    const { t,i18n } = useTranslation();
    return(
        <div id="templates">
            <div className='flex flex-col justify-center mb-5'>
                <h2   className="mt-20 text-4xl font-extrabold dark:text-white text-center">{t("home.find_your")} <span className='text-purple-500'>{t("home.perfect")}</span>  {t("home.template")}</h2>
                <p className="my-4 text-lg text-gray-500 w-2/3 text-center m-auto" dir={`${i18n.language === "ar" ? 'rtl' : 'ltr'}`}>
                    {t("home.paragraph2")}
                </p>

                <Link to="dashboard/templates" className="inline-flex justify-center items-center text-lg text-purple-500 hover:underline hover:text-black sm:w-1/3 m-auto">
                {t("home.choose_your_template")}
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                </Link>
            </div>
        
            <div className="h-screen">
            <Carousel pauseOnHover className='relative' >
                <img src="/templates/template1.png" className='sm:w-1/3' alt="..." />
                <img src="/templates/template2.png" className='sm:w-1/3' alt="..." />
                <img src="/templates/template3.png" className='sm:w-1/3' alt="..." />
                <img src="/templates/template4.png" className='sm:w-1/3' alt="..." />
                <img src="/templates/template5.png" className='sm:w-1/3' alt="..." />
                <img src="/templates/template6.png" className='sm:w-1/3' alt="..." />
            </Carousel>
            </div>
        </div>
    )
};
export default Templates