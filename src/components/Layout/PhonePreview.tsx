import React from 'react'
import InnerFrame from "../../../public/frame-inner.svg"
import OuterFrame from "../../../public/frame-outer.svg"

type Props = {}

const PhonePreview = (props: Props) => {
    return (
        <div className='relative h-[90vh] pt-[220px] w-full flex justify-center items-center'>
            <div className="absolute w-[300px]">
                <OuterFrame className="h-full w-full" preserveAspectRatio="xMinYMin" viewBox="0 0 308 632" />
            </div>
            <div className="absolute w-[280px]">
                <InnerFrame className="h-full w-full" preserveAspectRatio="xMinYMin" viewBox="0 0 286 612" />
            </div>
            <div className=" w-[230px] p-[20px] pt-[10px] flex flex-col items-center gap-[56px] z-[100]">
                <div className="flex flex-col items-center gap-[25px]">
                    <div className="h-[96px] w-[96px] bg-[#eeeeee] rounded-full"></div>
                    <div className="flex flex-col gap-[13px] items-center">
                        <div className="h-[16px] w-[160px] rounded-[104px] bg-[#eeeeee]"></div>
                        <div className="h-[8px] w-[72px] rounded-[104px] bg-[#eeeeee]"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-[20px]">
                    <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                    <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                    <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                    <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                    <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
                </div>

            </div>
        </div>
    )
}

export default PhonePreview