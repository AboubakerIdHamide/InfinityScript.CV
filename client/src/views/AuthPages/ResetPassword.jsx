import { Button } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { SERVER_URL } from '../../utils/constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Error } from '../../components/common';
import { setLogin } from '../../store/reducers/auth';
import {
  PasswordInput,
  PasswordConfirmationInput,
  Logo,
  OtpInput
} from "../../components/authPages";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfiramtion, setPwConfiramtion] = useState("");

  const { global, auth } = useSelector(state => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mutation = useMutation(async (data) => { 
    return await axios.post(`${SERVER_URL}/api/${global.lang}/auth/reset-password`, data).then((res)=>res.data);
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
        setPwConfiramtion("");
      }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      email: auth.user.email,
      otp,
      password,
      password_confirmation: pwConfiramtion
    });
  }

  return (
    <>
      <div className="bg-[#7752FE] h-screen flex flex-col gap-8 justify-center items-center flex-col bg-[url('/BG.png')] bg-cover bg-no-repeat">
      <Logo/>
      <form className="flex flex-col gap-5 w-3/4 sm:w-1/3 md:w-4/7 lg:w-1/4 ">
        {mutation.error ? (<Error error={mutation.error}/>): (
          <>
            <OtpInput otp={otp} setOtp={setOtp}/>
            <PasswordInput password={password} setPassword={setPassword}/>
            <PasswordConfirmationInput pwConfiramtion={pwConfiramtion} setPwConfiramtion={setPwConfiramtion}/>
            <Button disabled={mutation.isLoading} onClick={handleSubmit} type="submit" color='light' className='text-[#190482] '>RESET</Button>
          </>
        )}
      </form>
    </div>
    </>
  )
}

export default ResetPassword