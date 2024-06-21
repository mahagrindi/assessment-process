"use client"
import React from "react";
import {Information} from '@/components/Profile/profile-general-information';
import Tabs from '@/ui/tabs';
import { identify } from "@/lib/actions/current-user-action";
import { ContentHeader } from "@/components/content-header";
import { ProfileHeader } from "@/components/Profile/profile-header";
import { HistoryOfAssesment } from "@/components/Profile/history-assessment";
import { usePathname } from 'next/navigation'
import { useAuth } from '@/provider/user-provider'
import ChartLine from "@/components/ChartLine";
import ChartPie from "@/components/ApexChart";
export default function Page(): JSX.Element {

  const { logout, user, isAuthenticated } = useAuth()


  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader title={'Profile'} args={[]} />
      <ProfileHeader user={user} />
      <div className='bg-primary-white mt-5 border-[2px] border-gray-200'>

        <div className="flex flex-row  my-5 ">
          <HistoryOfAssesment />
        </div>
      </div>


    </div>
  );
}