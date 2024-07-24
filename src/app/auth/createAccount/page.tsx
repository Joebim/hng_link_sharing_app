"use client"

import React, { useState } from 'react'
import Logo from "../../../../public/logo.svg"
import InputField from '@/components/Shared/InputField'
import Email from "../../../../public/email.svg"
import Lock from "../../../../public/lock.svg"
import Button from '@/components/Shared/Button'

type Props = {}

const CreateAccount = (props: Props) => {

  const [error, seterror] = useState("")

  const onChange = () => {

  }

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
            <form className='flex flex-col gap-[20px]' action="">

              <InputField
                placeholder='Enter Your Email'
                Icon={Email}
                onChange={onChange}
                error={error}
                label='Email address'
                inputType="text"
              />

              <InputField
                placeholder='Enter Your Password'
                Icon={Lock}
                onChange={onChange}
                error={error}
                label='Password'
                inputType="password"
              />

              <InputField
                placeholder='Enter Your Password'
                Icon={Lock}
                onChange={onChange}
                error={error}
                label='Password'
                inputType="password"
              />


            </form>

            <p className="text-body-s text-grey-300">Password must contains at least 8 characters</p>

            <Button
              onClick={() => console.log("clicked")}
              disabled={false}
              variant="primary"
            >
              Login
            </Button>
            <div className=" flex justify-center items-center">
              <p className="text-body-m text-dark flex flex-col items-center sm:block">Already have an account? <span className='text-primary-default'><a href="">Login</a></span></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreateAccount