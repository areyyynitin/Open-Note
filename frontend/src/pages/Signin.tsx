import { useRef, useState } from 'react';
import { Button } from '../components/Buttons';
import { AuthInput } from '../components/AuthInput';
import BACKEND_URL from '../config';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { EyeOpen } from '../icons/EyeOpen';
import { EyeClose } from '../icons/EyeClose';

// ✅ Define expected response shape
type SigninResponse = {
  message: string; // assuming this contains the JWT
};

export const SignIn = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  async function signin() {
    try {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;

      if (!username || !password) {
        setErrorMsg("Please fill in both fields.");
        return;
      }

      const response = await axios.post<SigninResponse>(
        BACKEND_URL + "/api/v1/brain/signin",
        { username, password }
      );

      const jwt = response.data.message;
      if (!jwt) {
        setErrorMsg("Authentication failed. Try again.");
        return;
      }

      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const status = error.response?.status;
      const message = error.response?.data?.message || "";

      if (status === 401 || status === 403) {
        if (message.toLowerCase().includes("username")) {
          setErrorMsg("Invalid username. Please try again.");
        } else if (message.toLowerCase().includes("password")) {
          setErrorMsg("Incorrect password. Please try again.");
        } else {
          setErrorMsg("Invalid credentials.");
        }
      } else {
        setErrorMsg("Something went wrong. Please try again later.");
      }
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-200">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <AuthInput ref={usernameRef} placeholder="Username" />

        <div className="relative w-full">
          <AuthInput
            ref={passwordRef}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            className="pr-10 flex"
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOpen /> : <EyeClose />}
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            onClick={signin}
            loading={false}
            text="Signin"
            variant="primary"
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
