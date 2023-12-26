import { Button } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import axios from 'axios';
import { SERVER_URL } from '../../utils/constants';
import toast from 'react-hot-toast';
import { setLogin } from '../../store/reducers/auth';
import { Error } from '../../components/common';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLoading } from 'react-icons/ai';
import {
  Logo,
  OtpInput,
  Languages
} from "../../components/authPages";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const { global, auth } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation(async (data) => { 
    return await axios.post(`${SERVER_URL}/api/${global.lang}/auth/verifiy-email`, data).then((res)=>res.data);
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
        setOtp("");
      }
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email:auth.user.email, otp});
  }

  return (
    <>
    <div className="bg-royal-purple h-screen flex flex-col gap-8 justify-center items-center flex-col bg-[url('/BG.png')] bg-cover bg-no-repeat">
      <Logo/>
      <form className="flex flex-col gap-5 w-3/4 sm:w-1/3 md:w-4/7 lg:w-1/4 ">
        {mutation.error ? (<Error error={mutation.error}/>): (
          <>
            <OtpInput otp={otp} setOtp={setOtp}/>
            <Button disabled={mutation.isLoading} onClick={handleSubmit} type="submit" color='light' className='text-[#190482] '>
              {mutation.isLoading ? <AiOutlineLoading className="h-6 w-6 animate-spin" /> : t("auth.verify")}
            </Button>
            <div  className="mt-5">
              <Languages/>
            </div>
          </>
        )}
      </form>
    </div>
    </>
  )
}

export default VerifyEmail