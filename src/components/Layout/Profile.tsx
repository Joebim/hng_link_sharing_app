import React from 'react'
import Button from '../Shared/Button'
import ImageIcon from "../../../public/image.svg"
import InputField from '../Shared/InputField'

type Props = {}

const Profile = (props: Props) => {

  const onChange = () => { }

  return (
    <div className="sm:p-0 p-[20px] ">
      <div className="bg-white sm:bg-transparent rounded-t-[12px]">
        <div className='p-[20px] sm:p-[40px] flex flex-col gap-[24px]'>
          <div className="flex flex-col gap-[10px]">
            <h1 className="font-bold text-heading-m text-dark">Profile Details</h1>
            <p className="text-body-m text-grey-300">Add your details to create a personal touch to your profile.</p>
          </div>
        </div>
        <div className="px-[20px] sm:px-[40px] pb-[100px] flex flex-col gap-[24px]">
          <div className="p-[20px] h-auto sm:h-[233px] bg-grey-100 rounded-[12px] flex flex-col sm:flex-row">
            <div className="flex-[4] flex items-center justify-start p-[24px] pl-0 sm:pl-[24px]">
              <p className="text-body-m text-grey-300">Profile picture</p>
            </div>
            <div className="rounded-[12px] bg-dark w-[193px] h-[193px] bg-opacity-50 flex justify-center items-center">
              <div className="flex flex-col items-center gap-[8px]">
                <ImageIcon />
                <p className="text-body-m font-[600] text-white">Change Image</p>
              </div>
            </div>
            <div className="flex-[4] flex items-center justify-start p-[24px] pl-0 sm:pl-[24px]">
              <p className="text-body-s text-grey-300">Image must be below 1024x1024px. Use PNG or JPG format.</p>
            </div>
          </div>
          <div className="p-[20px] bg-grey-100 rounded-[12px] flex flex-col gap-[12px]">
            <div className="flex items-center justify-between">
              <p className='text-body-m text-grey-300'>First name*</p>
              <div className="w-[63%]">
                <InputField
                  placeholder='e.g. John'
                  onChange={onChange}
                // error={error}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className='text-body-m text-grey-300'>Last name*</p>
              <div className="w-[63%]">
                <InputField
                  placeholder='e.g. Appleseed'
                  onChange={onChange}
                // error={error}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className='text-body-m text-grey-300'>Email</p>
              <div className="w-[63%]">
                <InputField
                  placeholder='e.g. email@example.com'
                  onChange={onChange}
                // error={error}
                />
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="w-full p-[20px] sm:p-[40px] flex justify-end">
          <Button
            onClick={() => console.log("clicked")}
            disabled={false}
            variant="primary"
          >
            Save
          </Button>
        </div>
      </div>
    </div>


  )
}

export default Profile