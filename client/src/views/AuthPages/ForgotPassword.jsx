import { Button } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import axios from 'axios';
import { SERVER_URL } from '../../utils/constants';
import toast from 'react-hot-toast';
import { Error } from '../../components/common';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../../store/reducers/auth';
import { useTranslation } from 'react-i18next';
import { AiOutlineLoading } from 'react-icons/ai';
import {
  EmailInput,
  Logo,
  Languages
} from "../../components/authPages";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { global } = useSelector(state => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const mutation = useMutation(async (data) => {
    return await axios.post(`${SERVER_URL}/api/${global.lang}/auth/forgot-password`, data).then((res)=>res.data);
  }, {
    onSuccess: (data) => {
      const options = { duration: 2000 };
      if (data.success) {
        toast.success(data.message, options);
        dispatch(setLogin({user : data.data.user, token: null}));
        navigate("/auth/reset-password");
      } else {
        let errors = data.data;
        if (errors) {          
          Object.keys(errors).forEach((key) => {
            toast.error(errors[key][0], options);
          });
        } else {
          toast.error(data.message, options);          
        }
        setEmail("");
      }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email});
  }

  return (
    <>
    <div className="bg-royal-purple h-screen flex flex-col gap-8 justify-center items-center flex-col bg-[url('/BG.png')] bg-cover bg-no-repeat">
      <Logo/>
      <form className="flex flex-col gap-5 w-3/4 sm:w-1/3 md:w-4/7 lg:w-1/4 ">
        {mutation.error ? (<Error error={mutation.error}/>): (
          <>
            <EmailInput email={email} setEmail={setEmail} />
            <Button disabled={mutation.isLoading} onClick={handleSubmit} type="submit" color='light' className='text-[#190482] '>
              {mutation.isLoading ? <AiOutlineLoading className="h-6 w-6 animate-spin" /> : t("auth.reset_password")}
            </Button>
          </>
        )}
      </form>
      <Languages/>
    </div>
    </>
  )
}

export default ForgotPassword