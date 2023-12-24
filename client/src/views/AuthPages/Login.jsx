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
import {
  EmailInput,
  PasswordInput,
  CheckboxInput,
  Logo
} from "../../components/authPages";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { global } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <>
    <div className="bg-[#7752FE] h-screen flex flex-col gap-8 justify-center items-center flex-col bg-[url('/BG.png')] bg-cover bg-no-repeat">
      <Logo/>
      <form className="flex flex-col gap-5 w-3/4 sm:w-1/3 md:w-4/7 lg:w-1/4 ">
          {mutation.error ? (<Error error={mutation.error}/>): (
            <>
              <EmailInput email={email} setEmail={setEmail} />
              <PasswordInput password={password} setPassword={setPassword} />
              <div className="flex justify-between">
                <CheckboxInput/>
                <Link to="forgot-password" className="text-white underline font-sans ms-2 text-sm font-medium">Forgot password?</Link>
              </div>
              <Button disabled={mutation.isLoading} onClick={handleSubmit} type="submit" color='light' className='text-[#190482] '>LOGIN</Button>
              <span className='text-white text-center '>Don`t have an account ? <br/>Sign Up from <Link to="register" className='underline font-bold'>here</Link>.</span>
            </>
        )}
      </form>
    </div>
    </>
  )
}

export default Login