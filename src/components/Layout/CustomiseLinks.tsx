import React, { useState } from 'react';
import Button from '../Shared/Button';
import HandClickStart from "../../../public/hand-click-start.svg";
import LinkCard from '../Shared/LinkCard';

type Props = {};

const CustomiseLinks: React.FC<Props> = () => {
    const [links, setLinks] = useState<number[]>([]);

    const addLinkCard = () => {
        setLinks([...links, links.length]);
    };

    const removeLinkCard = (index: number) => {
        setLinks(links.filter((_, i) => i !== index));
    };

    return (
        <div className='sm:p-0 p-[20px] '>
            <div className="p-[20px] sm:p-[40px] flex flex-col gap-[24px] min-h-[700px] bg-white sm:bg-transparent rounded-t-[12px] sm:rounded-t-none">
                <div className="flex flex-col gap-[40px]">
                    <div className="flex flex-col gap-[10px]">
                        <h1 className="font-bold text-[24px] sm:text-heading-m text-dark">Customize your links</h1>
                        <p className="text-body-m text-grey-300">Add/edit/remove links below and then share all your profiles with the world!</p>
                    </div>
                    <Button
                        onClick={addLinkCard}
                        disabled={false}
                        variant="secondary"
                    >
                        + Add new link
                    </Button>
                </div>

                {links.length === 0 ? (
                    <div className="py-[80px] px-[22px] flex flex-col items-center gap-[40px] rounded-[12px] bg-grey-100">
                        <HandClickStart />
                        <div className="flex flex-col items-center gap-[24px]">
                            <h1 className="text-dark text-[24px] sm:text-heading-m font-bold">Let’s get you started</h1>
                            <div className="flex flex-col items-center text-center text-grey-300 text-body-m w-[100%] sm:w-[75%]">
                                <p className="">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    links.map((_, index) => (
                        <LinkCard key={index} index={index} removeCard={removeLinkCard} />
                    ))
                )}
            </div>
            <hr />
            <div className="p-[40px] flex justify-end bg-white sm:bg-transparent rounded-b-[12px] sm:rounded-b-none">
                <Button
                    onClick={() => console.log("clicked")}
                    disabled={false}
                    variant="primary"
                >
                    Save
                </Button>
            </div>
        </div>
    )
}

export default CustomiseLinks;
