import { Button } from '../components/Buttons'
import { useRef, useState } from 'react'
import axios from 'axios';
import BACKEND_URL from '../config';
import { useNavigate } from 'react-router-dom';
import { EyeClose } from '../icons/EyeClose';
import { EyeOpen } from '../icons/EyeOpen';
import { AuthInput } from '../components/AuthInput';

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      await axios.post(BACKEND_URL + "/api/v1/brain/signup", {
        username,
        password
      });
      navigate("/signin");
    } catch (error: any) {
      if (error.response?.status === 411) {
        // User already exists
        setErrorMsg("User already exists. Please choose a different username.");
      } else {
        setErrorMsg("Something went wrong. Try again.");
      }
    }
  }

  return (
  <div className='h-screen w-screen flex flex-col justify-center items-center bg-gray-200'>
    <div className='bg-white rounded-xl border min-w-48 p-8'>
      <AuthInput ref={usernameRef} placeholder='Username' />

      <div className="relative w-full">
        <AuthInput
          ref={passwordRef}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          className="pr-10"
        />
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer flex items-center justify-center"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOpen /> : <EyeClose />}
        </div>
      </div>

      <div className='flex justify-center pt-4'>
        <Button
          onClick={signup}
          loading={false}
          text='Signup'
          variant='primary'
          fullWidth={true}
        />
      </div>
    </div>

    
    {errorMsg && (
      <div className="text-red-500 text-sm mt-3 text-center font-medium animate-pulse">
        {errorMsg}
      </div>
    )}
  </div>
);

};
