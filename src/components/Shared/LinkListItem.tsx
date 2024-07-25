import React from 'react';
import ArrowRight from "../../../public/arrow-right.svg";

type Link = {
  id: number;
  platform: string;
  url: string;
  icon: React.ElementType;
  color: string;
};

type Props = {
    item: Link;
};

const LinkListItem: React.FC<Props> = ({ item }) => {
    return (
        <div
            className="w-[237px] h-[44px] rounded-[8px] py-[11px] px-[16px] flex flex-row justify-between items-center"
            style={{ backgroundColor: item.color, border: `${item.color === "#FFFFFF" ? "1px solid #D9D9D9" : ""}` }}
        >
            <div className="flex flex-row items-center gap-[20px]">
                <item.icon
                    fill={item.color === "#FFFFFF" ? "#000000" : "#ffffff"}
                />
                <p
                    className="text-body-m text-white"
                    style={{ color: `${item.color === "#FFFFFF" ? "#000000" : ""}` }}
                >
                    {item.platform}
                </p>
            </div>
            <ArrowRight
                fill={item.color === "#FFFFFF" ? "#000000" : "#ffffff"}
            />
        </div>
    );
};

export default LinkListItem;
