"use client"

import React from 'react';
import Button from '@/components/Shared/Button';
import { useAuth } from '@/utils/context/AuthContext';
import { useLinkContext } from '@/utils/context/LinkContext';
import LinkListItem from '@/components/Shared/LinkListItem';
import Image from 'next/image';

type Props = {}

const Preview = (props: Props) => {
  const { links } = useLinkContext();
  const { currentUser } = useAuth();

  const imageUrl = currentUser?.photoURL || "";

  const shareLink = async () => {
    const url = window.location.href; 

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my links!',
          url: url,
        });
        console.log('Link shared successfully!');
      } catch (error) {
        console.error('Error sharing link:', error);
      }
    } else {
      alert(`Share this link: ${url}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[750px] sm:min-h-[984px] py-[100px] sm:py-[300px]">
      <div className="top-0 absolute p-0 sm:p-[24px] z-[100] w-full">
        <div className='w-full rounded-[0px] sm:rounded-[12px] bg-white p-[16px] flex justify-between items-center font z-[100]'>
          <a href="/">
            <Button
              disabled={false}
              variant="secondary"
            >
              Back to Editor
            </Button>
          </a>

          <Button
            onClick={shareLink}
            disabled={false}
            variant="primary"
          >
            Share Link
          </Button>
        </div>
      </div>

      <div className="absolute top-0 h-[357px] w-full rounded-b-[32px] bg-primary-default hidden sm:block"></div>

      <div className="absolute rounded-[24px] bg-white w-[349px] p-[20px] py-[40px] flex flex-col items-center gap-[56px] z-[100]">
        <div className="flex flex-col items-center gap-[25px]">
          <div className="h-[96px] w-[96px] bg-[#eeeeee] rounded-full border-[4px] border-solid border-primary-default overflow-hidden">
            <Image
              src={imageUrl}
              alt="Profile Image"
              height={92}
              width={92}
              className="w-[92px] h-[92px] object-cover"
            />
          </div>
          <div className="flex flex-col gap-[13px] items-center">
            <h1 className="text-dark text-heading-m font-bold">{currentUser?.displayName}</h1>
            <p className="text-dark text-body-m">{currentUser?.email}</p>
          </div>
        </div>
        {links.length === 0 ? (
          <div className="flex flex-col gap-[20px]">
            <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
            <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
            <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
            <div className="w-[237px] h-[44px] rounded-[8px] bg-[#eeeeee]"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            {links.map((linkItem, id) => (
              <LinkListItem key={id} item={linkItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Preview;
