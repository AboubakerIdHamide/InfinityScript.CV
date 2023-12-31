
import { Button } from 'flowbite-react';
import { t } from "i18next";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { SERVER_URL } from '../../utils/constants';
import { Error } from "../../components/common";
import toast from "react-hot-toast";
import { AiOutlineLoading } from 'react-icons/ai';

const Contact = () => {
    const { auth } = useSelector(state => state);
    const [email, setEmail] = auth.token ? useState(auth.user.email) : useState("");
    const [comment, setComment] = useState("");

    const mutation = useMutation(
        async (formData) => {
          return await axios.post(`${SERVER_URL}/api/${global.lang}/contact`, formData).then((res) => res.data);
        },
        {
          onSuccess: (data) => {
            const options = { duration: 2000 };
            if (data.success) {
              toast.success(data.message, options);
              // Handle any additional logic after successful form submission
            } else {
              let errors = data.data;
              if (errors) {
                Object.keys(errors).forEach((key) => {
                  toast.error(errors[key][0], options);
                });
              } else {
                toast.error(data.message, options);
              }
            }
          },
          onError: (error) => {
            // Handle error, e.g., show an error message
            console.error('Error during form submission:', error);
          },
        }
      );
    
      const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ email, comment });
      };
    return(
        <div id="contact" className=" flex flex-col gap-10 justify-center h-screen">
            <div className=' mt-10'>
                <h2  className="text-4xl font-extrabold dark:text-white text-center">{t("home.we")} <span className='text-purple-500'> {t("home.love")} </span> {t("home.to_hear_from_you")} </h2>
                <p className="my-4 text-lg text-gray-500 w-2/3 text-center m-auto">{t("home.paragraph3")}</p>
            </div>
            <form className="flex flex-col justify-center items-center gap-8" onSubmit={handleSubmit}>
          {mutation.error ? (<Error error={mutation.error}/>): (
            <>
                <input type="email" name='email' id="email" className="bg-purple-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block sm:w-1/3 w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("home.email")} value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <textarea maxLength={400} name='comment' id="message" rows="7" className="bg-purple-100 sm:w-1/3 w-3/4 block p-2.5 text-sm text-gray-900 bg-purple-100 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={t("home.leave_a_comment")} onChange={(e) => {setComment(e.target.value)}}>{comment}</textarea>
                <Button color="purple" disabled={mutation.isLoading} className="w-1/4 md:w-1/6">
                {mutation.isLoading ? <AiOutlineLoading className="h-6 w-6 animate-spin" /> : t("home.send")}
                </Button>
            </>
          )}
            </form>
        </div>
    )
}
export default Contact