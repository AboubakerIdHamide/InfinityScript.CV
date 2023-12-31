import { useTranslation } from "react-i18next" 

const About = () => {
    const {t, i18n} = useTranslation();
    return(
        <div id="about" className=" flex flex-col justify-center">
            <div className=' mt-10'>
                <h2  className="text-4xl font-extrabold dark:text-white text-center mt-5">{t("home.discover_our") } <span className='text-purple-500'> {t("home.story")} </span></h2>
                <p className="my-4 text-lg text-gray-500 w-2/3 text-center m-auto">{t("home.paragraph4")}</p>
            </div>
            <div className=" flex sm:flex-row flex-col gap-10 justify-center items-center flex-col-reverse">
                <div className="w-1/3">
                    <img src="prologue.png" alt="prologue" />
                </div>
                <div className="sm:w-1/2 p-3">
                    <h3 class="text-3xl font-bold mb-3 text-center">{t("home.prologue")}</h3>
                    <p className="text-center text-gray-500" dir={`${i18n.language === "ar" ? 'rtl' : 'ltr'}`}>{t("home.paragraph5")}</p>
                </div>
            </div>
            <div className=" flex sm:flex-row sm:flex-row-reverse flex-col flex-col-reverse gap-10 justify-center items-center">
                <div className="w-1/3">
                    <img src="chapterOne.png" alt="Chapte One" />
                </div>
                <div className="sm:w-1/2 p-3">
                    <h3 class="text-3xl font-bold mb-3 text-center">{t("home.chapter_one")}</h3>
                    <p className="text-center text-gray-500" dir={`${i18n.language === "ar" ? 'rtl' : 'ltr'}`}>{t("home.paragraph6")}</p>
                </div>
            </div>
            <div className="flex sm:flex-row flex-col gap-10 justify-center items-center flex-col-reverse">
                <div className="w-1/3">
                    <img src="future.png" alt="Next Steps" />
                </div>
                <div className="sm:w-1/2 p-3">
                    <h3 class="text-3xl font-bold mb-3 text-center">{t("home.whats_next")}</h3>
                    <p className="text-center text-gray-500">{t("home.paragraph7")}</p>
                </div>
            </div>
        </div>
    )
}
export default About