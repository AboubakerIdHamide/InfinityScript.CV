import { useState } from "react";
import { Button } from 'flowbite-react';
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { SERVER_URL } from "../../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../store/reducers/auth";
import { Error } from "../../components/common";
import toast from "react-hot-toast";
import { AiOutlineLoading } from 'react-icons/ai';
import {
  EmailInput,
  PasswordInput,
  Languages,
  Logo
} from "../../components/authPages";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { global } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const mutation = useMutation(async (data) => { 
    return await axios.post(`${SERVER_URL}/api/${global.lang}/auth/login`, data).then((res)=>res.data);
  }, {
    onSuccess: (data) => {
      const options = { duration: 2000 };
      if (data.success) {
        toast.success(data.message, options);
        dispatch(setLogin(data.data));
        navigate("/dashboard/new");
      } else {
        let errors = data.data;
        if (errors) {          
          Object.keys(errors).forEach((key) => {
            toast.error(errors[key][0], options);
          });
        } else {
          toast.error(data.message, options);          
        }
        setPassword("");
      }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  }

  return (
    <div className="bg-[#7752FE] h-screen flex flex-col gap-8 justify-center items-center flex-col bg-[url('/BG.png')] bg-cover bg-no-repeat">
      <Logo/>
      <form className="flex flex-col gap-5 w-3/4 sm:w-1/3 md:w-4/7 lg:w-1/4 ">
          {mutation.error ? (<Error error={mutation.error}/>): (
            <>
              <EmailInput email={email} setEmail={setEmail} />
              <PasswordInput password={password} setPassword={setPassword} />
              <div className="flex justify-between">
                <Link to="forgot-password" className="text-white underline font-sans ms-2 text-sm font-medium">{t("auth.forgot_password")}</Link>
              </div>
              <Button disabled={mutation.isLoading} onClick={handleSubmit} type="submit" color='light' className='text-[#190482] '>
                {mutation.isLoading ? <AiOutlineLoading className="h-6 w-6 animate-spin" /> : t("auth.login")}
              </Button>
              <span className='text-white text-center '>{t("auth.dont_have_account")} <br/>{t("auth.sign_up_from")} <Link to="register" className='underline font-bold'>{t("auth.here")}</Link></span>
              
            </>
        )}
      </form>
      <Languages></Languages>
    </div>
  )
}

export default Login