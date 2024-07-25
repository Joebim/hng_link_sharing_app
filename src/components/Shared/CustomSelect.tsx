import React, { useState, ChangeEvent, useEffect, useRef } from 'react';

type Option = {
  name: string;
  icon: React.ElementType;
};

type Props = {
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  label?: string;
  inputType?: 'text' | 'password' | 'select';
  options?: Array<Option>;
};

const CustomSelect: React.FC<Props> = ({ placeholder, onChange, error, label, inputType, options = [] }) => {
  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange({ target: { value: option.name } } as ChangeEvent<HTMLInputElement | HTMLSelectElement>);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <label htmlFor={label} className='text-body-s text-dark'>{label}</label>
      <div
        className={`flex items-center gap-4 bg-white border rounded-lg px-4 py-2 cursor-pointer ${isOpen ? "border-primary-default shadow-custom-purple" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <>
            <selectedOption.icon className="text-grey-300" />
            <span>{selectedOption.name}</span>
          </>
        ) : (
          <span>{placeholder}</span>
        )}
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 px-[15px] max-h-[370px] overflow-y-auto">
          {options.map((option, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 p-2 cursor-pointer ${selectedOption.name === option.name ? "text-primary-default" : ""} hover:bg-grey-100 border-b-[1px] border-solid border-grey-200`}
              onClick={() => handleOptionClick(option)}
            >
              <option.icon className={`${selectedOption.name === option.name ? "text-primary-default" : "text-grey-300"}`} />
              <span>{option.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
