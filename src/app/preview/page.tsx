"use client"

import Button from '@/components/Shared/Button'
import React from 'react'

type Props = {}

const Preview = (props: Props) => {
  return (
    <div className="flex justify-center items-center min-h-[750px] sm:min-h-[984px] py-[100px] sm:py-[300px]">

      <div className="top-0 absolute p-0 sm:p-[24px] z-[100] w-full">
        <div className='w-full rounded-[0px] sm:rounded-[12px] bg-white p-[16px] flex justify-between items-center font z-[100]'>
          <a href="/">
            <Button
              onClick={() => console.log("clicked")}
              disabled={false}
              variant="secondary"
            >
              Back to Editor
            </Button>
          </a>



          <Button
            onClick={() => console.log("clicked")}
            disabled={false}
            variant="primary"
          >
            Share Lock
          </Button>
        </div>
      </div>


      <div className="absolute top-0 h-[357px] w-full rounded-b-[32px] bg-primary-default hidden sm:block"></div>



      <div className=" absolute rounded-[24px] bg-white w-[349px] p-[20px] py-[40px] flex flex-col items-center gap-[56px] z-[100]">
        <div className="flex flex-col items-center gap-[25px]">
          <div className="h-[96px] w-[96px] bg-[#eeeeee] rounded-full"></div>
          <div className="flex flex-col gap-[13px] items-center">
            <h1 className="text-dark text-heading-m font-bold">Ben Wright</h1>
            <p className="text-dark text-body-m">ben@example.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
          <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
          <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
          <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
        </div>

      </div>
    </div>
  )
}

export default Preview