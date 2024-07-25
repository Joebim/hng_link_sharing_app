"use client"

import React, { ReactNode, useState } from 'react';
import Profile from './Profile';
import CustomiseLinks from './CustomiseLinks';
import NavTab from '../Shared/NavTab';
import PhonePreview from './PhonePreview';
import { useAuth } from '@/utils/context/AuthContext';

type Props = {

};

const MainLayout: React.FC<Props> = () => {
    const [tab, setTab] = useState<string>("customize");

    const currentUser = useAuth()

    console.log('currentUser', currentUser)

    return (
        <div className="min-h-screen gap-[24px] p-0 sm:p-[24px] flex flex-col">
            <NavTab tab={tab} setTab={setTab} />
            <div className="flex gap-[24px] h-full min-h-[120vh]">
                <div className="flex-[4] hidden lg:flex justify-center rounded-[12px]">
                    <PhonePreview />
                </div>
                <div className="flex-[6] rounded-[12px] bg-transparent sm:bg-white ">
                    {tab === "customize" ? <CustomiseLinks /> : <Profile />}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
