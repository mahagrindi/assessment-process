// 'use client' has been omitted for brevity
"use client"
import React from "react"; 
import Tabs from '@/ui/tabs/tabs';
import { identify } from "@/lib/actions/current-user-action";
import { ContentHeader } from "@/components/content-header";
import { ProfileHeader } from "@/components/Profile/profile-header";
import { HistoryOfAssesment } from "@/components/Profile/history-assessment";
import { StartupGeneralInformation } from "@/components/Profile/profile-startup-general-information";

export default function Page(): JSX.Element {
 

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader title={'Detail Startup '} args={[]} />
      <ProfileHeader  fullName="testing" email="conatct@test.com" description="Maecenas semper purus lacus, vitae facilisis neque luctus sit amet. Morbi augue tellus, auctor fringilla quam non, feugiat feugiat leo." />
      <Tabs child1={<StartupGeneralInformation />} child2={<HistoryOfAssesment />} />
  </div>
  );
}
