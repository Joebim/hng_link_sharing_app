import React from 'react'
import Logo from "../../../public/logo.svg"
import LinkIcon from "../../../public/link.svg"
import User from "../../../public/user.svg"
import Eye from "../../../public/eye.svg"

type NavTabProperties = {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
};

const NavTab: React.FC<NavTabProperties> = ({
  tab,
  setTab,
}) => {

  const navTabItems = [
    {
      name: "Links",
      type: "customize",
      icon: LinkIcon,
    },
    {
      name: "Profile Details",
      type: "profile",
      icon: User,
    },
  ];

  return (
    <div className='w-full rounded-[0px] sm:rounded-[12px] bg-white p-[16px] flex justify-between items-center font'>

      <a href="/auth/login">
        <div className="flex gap-[10px] items-center">
          <div className="w-[30px]">
            <Logo
              viewBox="0 0 34 34"
              preserveAspectRatio="xMinYMin"
              className="h-full w-full"
            />
          </div>
          <h1 className="hidden sm:block font-bold text-[24px]">devlinks</h1>
        </div>
      </a>

      <div className="flex ">
        {navTabItems.map((navItem, id) => (
          <div
            onClick={() => setTab(navItem.type)}
            key={id} className={`flex px-[27px] py-[11px] cursor-pointer rounded-[8px] font-[600] gap-[10px] items-center ${navItem.type == tab ? "bg-primary-100 text-primary-default" : "text-[#888888]"}`}>
            <navItem.icon />
            <p className={`hidden sm:block ${navItem.type == tab ? "text-primary-default" : "text-[#888888]"}`}>{navItem.name}</p>
          </div>
        ))}
      </div>
      <a href="/preview">
        <div className="rounded-[8px] px-[27px] py-[11px] cursor-pointer text-heading-s border-solid border border-primary-default text-primary-default font-[600]">
          <p className="hidden sm:block">Preview</p>
          <Eye className="block sm:hidden" />
        </div>
      </a>

    </div>
  )
}

export default NavTab