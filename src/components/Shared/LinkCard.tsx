import React from 'react';
import LinkBullet from "../../../public/link-bullet.svg";
import InputField from '../Shared/InputField';
import CustomSelect from '../Shared/CustomSelect';
import { useLinkContext } from '@/utils/context/LinkContext';
import { Link } from '@/utils/types/types';
import { options } from '@/utils/icons';

type Props = {
  link: Link;
};

const LinkCard: React.FC<Props> = ({ link }) => {
  const { removeLink, updateLink } = useLinkContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateLink(link.id, { ...link, [name]: value });
  };

  const handleSelectChange = (value: string) => {
    const selectedOption = options.find(option => option.name === value);
    if (selectedOption) {
      updateLink(link.id, { ...link, platform: selectedOption.name, color: selectedOption.color });
    }
  };


  return (
    <div className="rounded-[12px] p-[20px] flex flex-col gap-[12px] bg-gray-100">
      <div className="flex justify-between items-center">
        <div className="flex gap-[8px] items-center">
          <LinkBullet />
          <p className="text-body-m font-bold text-grey-300">Link #{link.id}</p>
        </div>
        <div className="p-[5px] cursor-pointer hover:bg-grey-200 rounded-[5px]" onClick={() => removeLink(link.id)}>
          Remove
        </div>
      </div>

      <CustomSelect
        label="Platform"
        placeholder="Choose a platform"
        onChange={(e) => handleSelectChange(e.target.value)}
      />

      <InputField
        placeholder='e.g. https://www.github.com/johnappleseed'
        onChange={onChange}
        label='Link'
        name="url"
        value={link.url}
      />
    </div>
  );
};

export default LinkCard;
