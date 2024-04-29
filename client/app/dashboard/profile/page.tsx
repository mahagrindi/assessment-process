// 'use client' has been omitted for brevity
"use client"
import React from "react";
import {Information} from '@/components/Profile/profile-general-information'; 
import Tabs from '@/ui/tabs/tabs';
import { identify } from "@/lib/actions/current-user-action";
import { ContentHeader } from "@/components/content-header";
import { ProfileHeader } from "@/components/Profile/profile-header";
import { HistoryOfAssesment } from "@/components/Profile/history-assessment";

export default function Page(): JSX.Element {
  const [user, setUser] = React.useState<AuthUserProfileType>();

  React.useEffect(() => {
    identify().then((res) => setUser(res));
  }, []);

  return (
    <div className='h-full min-h-full w-full'>
      <ContentHeader title={'Profile'} args={[]} />
      <ProfileHeader  fullName={user?.firstName + " " + user?.lastName}  email={user?.username}   description="Maecenas semper purus lacus, vitae facilisis neque luctus sit amet. Morbi augue tellus, auctor fringilla quam non, feugiat feugiat leo." />
      <Tabs child1={<Information />} child2={<HistoryOfAssesment />} />
  </div>
  );
}
