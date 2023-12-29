
import { Button } from 'flowbite-react';
import { t } from "i18next";
const Contact = () => {
    return(
        <div id="contact" className=" flex flex-col gap-10 justify-center h-screen">
            <div className=' mt-10'>
                <h2  className="text-4xl font-extrabold dark:text-white text-center">{t("home.we")} <span className='text-purple-500'> {t("home.love")} </span> {t("home.to_hear_from_you")} </h2>
                <p className="my-4 text-lg text-gray-500 w-2/3 text-center m-auto">{t("home.paragraph3")}</p>
            </div>
            <form className="flex flex-col justify-center items-center gap-8">
                <input type="email" id="email" className="bg-purple-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block sm:w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("home.email")} required/>
                <textarea maxLength={400} id="message" rows="7" className="bg-purple-100 sm:w-1/3 block p-2.5 text-sm text-gray-900 bg-purple-100 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("home.leave_a_comment")}></textarea>
                <Button color="purple" className="w-1/4 md:w-1/6">{t("home.send")}</Button>
            </form>
        </div>
    )
}
export default Contact