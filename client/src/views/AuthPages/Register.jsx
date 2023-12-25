import { Button } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { SERVER_URL } from '../../utils/constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Error } from '../../components/common';
import { Link, useNavigate } from 'react-router-dom';
import { setLogin } from '../../store/reducers/auth';
import {
  EmailInput,
  PasswordInput,
  PasswordConfirmationInput,
  CheckboxInput,
  Logo
} from '../../components/authPages';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfiramtion, setPwConfiramtion] = useState("");
  const { global } = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation(async (data) => { 
    return await axios.post(`${SERVER_URL}/api/${global.lang}/auth/register`, data).then((res)=>res.data);
  }, {
    onSuccess: (data) => {
      const options = { duration: 2000 };
      if (data.success) {
        toast.success(data.message, { duration: 10000 });
        dispatch(setLogin({user : data.data.user, token : null}));
        navigate("/auth/verify-email");
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
    mutation.mutate({ email, password, password_confirmation: pwConfiramtion });
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
              <PasswordConfirmationInput pwConfiramtion={pwConfiramtion} setPwConfiramtion={setPwConfiramtion} />

              <CheckboxInput/>
              <Button disabled={mutation.isLoading} onClick={handleSubmit} type="submit" color='light' className='text-[#190482]'>SIGN UP</Button>
              <span className='text-white text-center '>Already have an account ? <br/>Login from <Link to="login" className='underline font-bold'>here</Link>.</span>
            </>
          )}
      </form>
    </div>
    </>
  )
}
export default Register