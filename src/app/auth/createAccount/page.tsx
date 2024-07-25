"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Logo from "../../../../public/logo.svg";
import InputField from '@/components/Shared/InputField';
import Email from "../../../../public/email.svg";
import Lock from "../../../../public/lock.svg";
import Button from '@/components/Shared/Button';
import { useAuth } from '@/utils/context/AuthContext';
import { useRouter } from 'next/navigation';

type Props = {};

const CreateAccount: React.FC<Props> = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { signup } = useAuth();

  const router = useRouter()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    if(form.confirmPassword !== form.password) {
      setConfirmPasswordError("Password do not match")
    }

    if (name === "email") setEmailError("");
    if (name === "password") setPasswordError("");
    if (name === "confirmPassword") setConfirmPasswordError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.email) {
      setEmailError("Email can't be empty");
      return;
    }
    if (!validateEmail(form.email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (!form.password) {
      setPasswordError("Password can't be empty");
      return;
    }
    if (form.password.length < 8) {
      setPasswordError("Password must contain at least 8 characters");
      return;
    }

    // Validate confirm password
    if (form.password !== form.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {
      await signup(form.email, form.password);
      console.log('Account created successfully');
      router.push("/auth/login")
    } catch (error) {
      setEmailError("Failed to create account");
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
            <h1 className="font-bold text-heading-m text-dark">Create account</h1>
            <p className="text-body-m text-grey-300">Let’s get you started sharing your links!</p>
          </div>

          <div className="flex flex-col gap-[20px]">
            <form className='flex flex-col gap-[20px]' onSubmit={handleSubmit}>
              <InputField
                placeholder='Enter Your Email'
                Icon={Email}
                onChange={handleChange}
                error={emailError}
                label='Email address'
                inputType="text"
                name="email"
                value={form.email}
              />

              <InputField
                placeholder='Enter Your Password'
                Icon={Lock}
                onChange={handleChange}
                error={passwordError}
                label='Password'
                inputType="password"
                name="password"
                value={form.password}
              />

              <InputField
                placeholder='Confirm Your Password'
                Icon={Lock}
                onChange={handleChange}
                error={confirmPasswordError}
                label='Confirm Password'
                inputType="password"
                name="confirmPassword"
                value={form.confirmPassword}
              />

              <Button
                type="submit"
                variant="primary"
                disabled={false}
              >
                Create Account
              </Button>
            </form>

            <p className="text-body-s text-grey-300">Password must contain at least 8 characters</p>

            <div className="flex justify-center items-center">
              <p className="text-body-m text-dark flex flex-col items-center sm:block">
                Already have an account? <span className='text-primary-default'><a href="/auth/login">Login</a></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
