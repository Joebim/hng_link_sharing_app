"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/utils/firebase';
import Logo from "../../../../public/logo.svg";
import InputField from '@/components/Shared/InputField';
import Email from "../../../../public/email.svg";
import Lock from "../../../../public/lock.svg";
import Button from '@/components/Shared/Button';

type Props = {};

const Login: React.FC<Props> = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      console.log("Logged In");
      // Redirect to another page or perform further actions after successful login
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className='min-h-screen py-[50px] sm:py-[100px] w-full flex justify-center items-center bg-white sm:bg-transparent'>
      <div className="flex flex-col gap-[50px] sm:gap-[51px] w-full sm:w-auto items-start sm:items-center">
        <div className="flex gap-[20px] items-center pl-[30px] sm:pl-0">
          <Logo />
          <h1 className="font-bold text-heading-m text-dark">devlinks</h1>
        </div>
        <div className="flex flex-col gap-[30px] w-full sm:w-[476px] rounded-[18px] bg-transparent sm:bg-white p-[30px] sm:p-[40px]">
          <div className="flex flex-col gap-[20px]">
            <h1 className="font-bold text-heading-m text-dark">Login</h1>
            <p className="text-body-m text-grey-300">Add your details below to get back into the app</p>
          </div>

          <div className="flex flex-col gap-[20px]">
            <form className='flex flex-col gap-[20px]' onSubmit={handleSubmit}>
              <InputField
                placeholder='Enter Your Email'
                Icon={Email}
                onChange={handleChange}
                error={error}
                label='Email address'
                inputType="text"
                name="email"
                value={form.email}
              />

              <InputField
                placeholder='Enter Your Password'
                Icon={Lock}
                onChange={handleChange}
                error={error}
                label='Password'
                inputType="password"
                name="password"
                value={form.password}
              />

              <Button
                type="submit"
                variant="primary"
                disabled={!form.email || !form.password}
              >
                Login
              </Button>
            </form>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="flex justify-center items-center">
              <p className="text-body-m text-dark flex flex-col items-center sm:block">
                Don’t have an account? <span className='text-primary-default'><a href="">Create account</a></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
