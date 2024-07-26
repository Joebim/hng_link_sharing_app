import React from 'react';
import ArrowRight from "../../../public/arrow-right.svg";
import { Link } from '@/utils/types/types';
import { options } from '@/utils/icons'; 

type Props = {
    item: Link;
};

const LinkListItem: React.FC<Props> = ({ item }) => {

    const RenderIcon = (iconName: string): React.ReactNode => {
        const Icon = options.find(opt => opt.name === iconName)?.icon;
        if (!Icon) return null;
        return <Icon className={`${item.color === "#FFFFFF" ? "text-black" : "text-white"}`}/>;
    };

    return (
        <a href={item.url}>
          <div
            className="w-[237px] h-[44px] rounded-[8px] py-[11px] px-[16px] flex flex-row justify-between items-center"
            style={{ backgroundColor: item.color, border: `${item.color === "#FFFFFF" ? "1px solid #D9D9D9" : ""}` }}
        >
            <div className="flex flex-row items-center gap-[20px]">
                {RenderIcon(item.platform)}
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
        </a>
        
    );
};

export default LinkListItem;
