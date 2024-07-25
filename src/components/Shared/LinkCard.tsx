import React from 'react';
import LinkBullet from "../../../public/link-bullet.svg";
import Link from "../../../public/link.svg";
import InputField from '../Shared/InputField';
import CustomSelect from '../Shared/CustomSelect';
import { useLinkContext } from '@/utils/context/LinkContext';
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
  color: string;
};

type Props = {
  link: { id: number; platform: string; url: string; icon: React.ElementType; color: string; };
};

const options: Option[] = [
  { name: "GitHub", icon: Github, color: "#1A1A1A", },
  { name: "Frontend Mentor", icon: FrontendMentor, color: "#FFFFFF", },
  { name: "Twitter", icon: Twitter, color: "#43B7E9", },
  { name: "LinkedIn", icon: Linkedin, color: "#2D68FF", },
  { name: "YouTube", icon: Youtube, color: "#EE3939", },
  { name: "Facebook", icon: Facebook, color: "#2442AC", },
  { name: "Twitch", icon: Twitch, color: "#EE3FC8", },
  { name: "Dev.to", icon: DevTo, color: "#333333", },
  { name: "Codewars", icon: CodeWars, color: "#8A1A50", },
  { name: "Codepen", icon: CodePen, color: "#2e2e2e", },
  { name: "freeCodeCamp", icon: FreeCodeCamp, color: "#302267", },
  { name: "GitLab", icon: Gitlab, color: "#EB4925", },
  { name: "Hashnode", icon: Hashnode, color: "#0330D1", },
  { name: "Stack Overflow", icon: StackOverflow, color: "#EC7100", },
];

const LinkCard: React.FC<Props> = ({ link }) => {
  const { removeLink, updateLink } = useLinkContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateLink(link.id, { ...link, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    const selectedOption = options.find(option => option.name === value);
    if (selectedOption) {
      updateLink(link.id, { ...link, platform: selectedOption.name, icon: selectedOption.icon, color: selectedOption.color });
    }
  };


  return (
    <div className="rounded-[12px] p-[20px] flex flex-col gap-[12px] bg-gray-100">
      <div className="flex justify-between items-center">
        <div className="flex gap-[8px] items-center">
          <LinkBullet />
          <p className="text-body-m font-bold text-grey-300">Link #{link.id}</p>
        </div>
        <div className="p-[5px] cursor-pointer hover:bg-grey-200" onClick={() => removeLink(link.id)}>
          Remove
        </div>
      </div>

      <CustomSelect
        label="Platform"
        placeholder="Choose a platform"
        onChange={(e) => handleSelectChange(e.target.value)}
        options={options}
      />

      <InputField
        placeholder='e.g. https://www.github.com/johnappleseed'
        Icon={link.icon}
        onChange={onChange}
        label='Link'
        name="url"
        value={link.url}
      />
    </div>
  );
};

export default LinkCard;
