import React from 'react'
import LinkBullet from "../../../public/link-bullet.svg"
import Link from "../../../public/link.svg"
import InputField from '../Shared/InputField'
import CustomSelect from '../Shared/CustomSelect'

type Props = {}

const LinkCard = (props: Props) => {

    const onChange = () => { }
    const handleInputChange = () => { }


    return (
        <div className="rounded-[12px] p-[20px] flex flex-col gap-[12px] bg-gray-100">
            <div className="flex justify-between items-center">
                <div className="flex gap-[8px] items-center">
                    <LinkBullet />
                    <p className="text-body-m font-bold text-grey-300">Link #1</p>
                </div>
                <div className="p-[5px]">
                    Remove
                </div>
            </div>

            <CustomSelect
                label="Platform"
                placeholder="Choose a platform"
                onChange={handleInputChange}
            />

            <InputField
                placeholder='e.g. https://www.github.com/johnappleseed'
                Icon={Link}
                onChange={onChange}
                // error={error}
                label='Link'
            />
        </div>
    )
}

export default LinkCard