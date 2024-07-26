import React from 'react';
import InnerFrame from "../../../public/frame-inner.svg";
import OuterFrame from "../../../public/frame-outer.svg";
import { useLinkContext } from '@/utils/context/LinkContext';
import ArrowRight from "../../../public/arrow-right.svg";
import { useAuth } from '@/utils/context/AuthContext';
import LinkListItem from '../Shared/LinkListItem';
import Image from 'next/image';

type Props = {}

const PhonePreview: React.FC<Props> = () => {
    const { links } = useLinkContext();
    const { currentUser } = useAuth();

    const imageUrl = currentUser?.photoURL || "";

    return (
        <div className='relative h-[90vh] pt-[100px] w-full flex justify-center'>
            <div className="absolute w-[300px]">
                <OuterFrame className="h-full w-full" preserveAspectRatio="xMinYMin" viewBox="0 0 308 632" />
            </div>
            <div className="absolute w-[280px] mt-[8px]">
                <InnerFrame className="h-full w-full" preserveAspectRatio="xMinYMin" viewBox="0 0 286 612" />
            </div>
            <div className=" w-[230px] p-[20px] pt-[60px] flex flex-col items-center gap-[56px] z-[100]">
                <div className="flex flex-col items-center gap-[25px]">
                    <div className="h-[96px] w-[96px] bg-[#eeeeee] rounded-full border-[4px] border-solid border-primary-default overflow-hidden">
                        <img
                            src={imageUrl}
                            alt="Profile Image"
                            height={92}
                            width={92}
                            className="w-[92px] h-[92px] object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-[13px] items-center">
                        {currentUser?.displayName ? <h1 className="text-[18px] text-grey-300 font-[600]">{currentUser?.displayName}</h1> : <div className="h-[16px] w-[160px] rounded-[104px] bg-[#eeeeee]"></div>}

                        {currentUser?.email ? <h1 className="text-[14px] text-grey-300">{currentUser?.email}</h1> : <div className="h-[8px] w-[72px] rounded-[104px] bg-[#eeeeee]"></div>}

                    </div>
                </div>

                {links?.length === 0 ? (
                    <div className="flex flex-col gap-[20px]">
                        <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                        <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                        <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                        <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-[20px]">
                        {links?.map((linkItem, id) => (
                            <LinkListItem key={id} item={linkItem} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PhonePreview;
