import React from 'react'
import InnerFrame from "../../../public/frame-inner.svg"
import OuterFrame from "../../../public/frame-outer.svg"
import { useLinkContext } from '@/utils/context/LinkContext'
import ArrowRight from "../../../public/arrow-right.svg"
import { useAuth } from '@/utils/context/AuthContext'

type Props = {}

const PhonePreview = (props: Props) => {

    const link = useLinkContext()
    const currentUser = useAuth()

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
                    <div className="h-[96px] w-[96px] bg-[#eeeeee] rounded-full"></div>
                    <div className="flex flex-col gap-[13px] items-center">
                        {currentUser?.currentUser?.displayName ? <h1 className="text-[18px] text-grey-300 font-[600]">{currentUser?.currentUser?.displayName}</h1> : <div className="h-[16px] w-[160px] rounded-[104px] bg-[#eeeeee]"></div>}
                        
                        {currentUser?.currentUser?.email ? <h1 className="text-[14px] text-grey-300">{currentUser?.currentUser?.email}</h1> : <div className="h-[8px] w-[72px] rounded-[104px] bg-[#eeeeee]"></div>}
                        
                    </div>
                </div>

                {link.links.length == 0 ? <div className="flex flex-col gap-[20px]">
                    <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                    <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                    <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                    <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                    <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                </div> :
                    <div className="flex flex-col gap-[20px]">
                        {link.links.map((linkItem, id) => (
                            <div key={id} className={`w-[237px] h-[44px] rounded-[8px] py-[11px] px-[16px] flex flex-row justify-between items-center`}
                                style={{ backgroundColor: linkItem.color, border: `${linkItem.color === "#FFFFFF" ? "1px solid #D9D9D9" : ""}` }}
                            >
                                <div className="flex flex-row items-center gap-[20px]">
                                    <linkItem.icon
                                        fill={linkItem.color === "#FFFFFF" ? "#000000" : "#ffffff"}
                                    />
                                    <p className="text-body-m text-white"
                                        style={{ color: `${linkItem.color === "#FFFFFF" ? "#000000" : ""}` }}
                                    >{linkItem.platform}</p>
                                </div>
                                <ArrowRight
                                    fill={linkItem.color === "#FFFFFF" ? "#000000" : "#ffffff"}
                                />
                            </div>
                        ))}

                    </div>}

            </div>
        </div>
    )
}

export default PhonePreview