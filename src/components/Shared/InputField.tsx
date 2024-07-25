import React, { ChangeEvent, useState } from 'react';

type Props = {
    placeholder?: string;
    Icon?: React.ElementType;  // Accepts a React component type for the icon
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;  // Event handler for input change
    error?: string;
    label?: string;
    inputType?: string;
    name?: string;
    value?: string;
};

const InputField: React.FC<Props> = ({ placeholder, Icon, onChange, error, label, inputType, name, value }) => {

    const [type, setType] = useState<'password' | 'text'>(inputType === "password" ? "password" : "text");

    return (

        <>
            <div className="">
                <label htmlFor={label} className='text-body-s text-dark'>{label}</label>
                <div className={`flex items-center relative bg-white gap-[15px] border rounded-[8px] duration-100 px-[16px] py-[12px] active:shadow-custom-purple active:border-primary-default focus-within:border-primary-default focus-within:shadow-custom-purple ${error ? "border-red text-red" : "border-grey-200 text-dark"}`}>
                    {Icon && <Icon className="text-grey-500" />}

                    <input
                        name={name}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        className="flex-1 outline-none text-body-m w-full"
                    />

                    <p className="absolute right-0 text-body-s text-red mr-[16px]">{error}</p>
                </div>
            </div>

        </>

    );
};

export default InputField;
