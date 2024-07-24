import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import Github from "../../../public/github.svg";
import FrontendMentor from "../../../public/frontend-mentor.svg";
import Twitter from "../../../public/twitch.svg";
import Linkedin from "../../../public/linkedin.svg";
import Youtube from "../../../public/youtube.svg";
import Facebook from "../../../public/facebook.svg";
import Twitch from "../../../public/twitch.svg";
import DevTo from "../../../public/devto.svg";
import CodeWars from "../../../public/codewars.svg";
import CodePen from "../../../public/codepen.svg";
import FreeCodeCamp from "../../../public/free-code-camp.svg";
import Gitlab from "../../../public/gitlab.svg";
import Hashnode from "../../../public/hashnode.svg";
import StackOverflow from "../../../public/stack-overflow.svg";

type Option = {
  name: string;
  icon: React.ElementType;
};

type Props = {
  placeholder?: string;
  Icon?: React.ElementType;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  label?: string;
  inputType?: 'text' | 'password' | 'select';
};

const options: Option[] = [
  { name: "GitHub", icon: Github },
  { name: "Frontend Mentor", icon: FrontendMentor },
  { name: "Twitter", icon: Twitter },
  { name: "LinkedIn", icon: Linkedin },
  { name: "YouTube", icon: Youtube },
  { name: "Facebook", icon: Facebook },
  { name: "Twitch", icon: Twitch },
  { name: "Dev.to", icon: DevTo },
  { name: "Codewars", icon: CodeWars },
  { name: "Codepen", icon: CodePen },
  { name: "freeCodeCamp", icon: FreeCodeCamp },
  { name: "GitLab", icon: Gitlab },
  { name: "Hashnode", icon: Hashnode },
  { name: "Stack Overflow", icon: StackOverflow },
];

const CustomSelect: React.FC<Props> = ({ placeholder, Icon, onChange, error, label, inputType }) => {
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
