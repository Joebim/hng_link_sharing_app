import React, { useState, ChangeEvent } from 'react';
import Button from '../Shared/Button';
import ImageIcon from "../../../public/image.svg";
import InputField from '../Shared/InputField';
import { useAuth } from '@/utils/context/AuthContext';

type Props = {};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
};

const Profile: React.FC<Props> = (props: Props) => {

  const { currentUser, updateUserProfile, uploadImage } = useAuth();

  const [form, setForm] = useState<FormState>({
    firstName: currentUser?.displayName?.split(' ')[0] || '',
    lastName: currentUser?.displayName?.split(' ')[1] || '',
    email: currentUser?.email || '',
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const selectedFile = e.target.files[0];
        setImageUrl(URL.createObjectURL(selectedFile));
        uploadImage(selectedFile); // Upload image
    }
};

  const handleSubmit = async () => {
    const submitForm = {
      email: form.email,
      displayName: `${form.firstName} ${form.lastName}`,
      photoURL: imageUrl
    }
    await updateUserProfile(submitForm)
    console.log('Form submitted', form);
    if (imageUrl) {
      console.log('Image file:', imageUrl);
    }
  };

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
            {currentUser?.photoURL ?
              <div className="rounded-[12px] bg-dark w-[193px] h-[193px] bg-opacity-50 flex justify-center items-center">
                <div className="flex flex-col items-center gap-[8px]">
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-[20px]">
                    <ImageIcon />
                    <p className="text-body-m font-[600] text-white">Change Image</p>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/png, image/webp, image/jpeg, image/jpg, image/gif"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
              : <div className="rounded-[12px] bg-primary-100 w-[193px] h-[193px] bg-opacity-50 flex justify-center items-center">
                <div className="flex flex-col items-center gap-[8px]">
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-[20px]">
                    <ImageIcon className="text-primary-default" />
                    <p className="text-body-m font-[600] text-primary-default">+ Upload Image</p>
                  </label>
                  <input
                    type="file"
                    accept="image/png, image/webp, image/jpeg, image/jpg, image/gif"
                    id="image-upload"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>}

            <div className="flex-[4] flex items-center justify-start p-[24px] pl-0 sm:pl-[24px]">
              <p className="text-body-s text-grey-300">Image must be below 1024x1024px. Use PNG or JPG format.</p>
            </div>
          </div>
          <div className="p-[20px] bg-grey-100 rounded-[12px] flex flex-col gap-[12px]">
            <div className="flex items-center justify-between">
              <p className='text-body-m text-grey-300'>First name*</p>
              <div className="w-[63%]">
                <InputField
                  name="firstName"
                  placeholder='e.g. John'
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className='text-body-m text-grey-300'>Last name*</p>
              <div className="w-[63%]">
                <InputField
                  name="lastName"
                  placeholder='e.g. Appleseed'
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className='text-body-m text-grey-300'>Email</p>
              <div className="w-[63%]">
                <InputField
                  name="email"
                  placeholder='e.g. email@example.com'
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="w-full p-[20px] sm:p-[40px] flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={false}
            variant="primary"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
