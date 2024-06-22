
'use client'

import React, { FC } from 'react';

import { motion } from 'framer-motion'
import { MdOutlineChevronRight } from 'react-icons/md'
import  ApexChart  from '@/components/ApexChart'
import { LuAirplay, LuCalendarCheck, LuCalendarDays, LuExternalLink, LuText, LuTimer, LuUserSquare } from 'react-icons/lu'
import { Chip } from '@/ui/chip'
import { GoNumber } from 'react-icons/go'
interface Props {
     startup : StartupType

}
export const ProfileHeaderStartup: React.FC<Props> = ({startup }) => {
  return (
    <div className='bg-primary-white border-[2px] border-gray-200'>

      <div className="grid grid-cols-12 gap-4 my-5 ">


        <div className="col-start-1 col-end-1 mx-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={startup?.startupLogo ? startup?.startupLogo : 'https://startup.gov.tn/sites/default/files/2021-10/startuptunisia.png'} alt=""
               className="h-20 w-20  object-cover flex rounded-full" />
        </div>

        <div className="col-start-2 col-end-6 ">
          <div>
            <p className=" text-[24px]   font-semibold capitalize">{startup?.startupName}</p>
            <p className=" text-[14px]    font-semibold capitalize">Startup Activity Sector : {startup?.startupActivitySector}</p>

            <div>
              {startup.startupWebsite ? (
                <a className={'flex items-center gap-2 text-content-display uppercase'} href={startup.startupWebsite} target='_blank' rel='noreferrer'>
                  {startup && startup.startupWebsite.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/)?.[1]}
                  <LuExternalLink size={16} className='text-accent-link' />
                </a>
              ) : (
                <Chip title={'N/A'} variant={'warning'} />
              )}
            </div>


          </div>
        </div>


        <div className="col-end-12 col-span-2">
          <p>SCORE : 3.2 </p>
          <p>SCORE : Mature </p>
        </div>

      </div>

      <div className="flex gap-5  relative bg-primary-white border-y-[2px] border-gray-200 p-6 flex-row">


        <div className=' basis-11/12  flex flex-col gap-4 '>


          <div className="grid grid-cols-12 gap-4 my-5">
            <div className='"col-start-1 col-end-1'>
              <div>
                <h2 className="text-xl font-bold text-content-display capitalize">details</h2>
                <p className="text-sm text-content-prompt mb-1">The information that describes the startup .</p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-5">
                  <div className="col-span-1 flex items-center gap-2">
                    <LuAirplay className="text-gray-400" size={20} />
                    <p className="text-sm text-content-prompt capitalize font-[500]">Email</p>

                  </div>
                  <div className="col-span-4">
                    {startup.startupEmail ? (
                      <div className="col-span-4">
                        <p className="text text-content-display capitalize">{startup.startupEmail}</p>
                      </div>
                    ) : (
                      <Chip title={'N/A'} variant={'warning'} />
                    )}
                  </div>
                </div>


                <div className="grid grid-cols-5">
                  <div className="col-span-1 flex items-center gap-2">
                    <LuAirplay className="text-gray-400" size={20} />
                    <p className="text-sm text-content-prompt capitalize font-[500]">Phone</p>
                  </div>


                  {startup.startupPhone ? (
                    <div className="col-span-4">
                      <p className="text text-content-display capitalize">{startup.startupPhone}</p>
                    </div>
                  ) : (
                    <Chip title={'N/A'} variant={'warning'} />
                  )}
                </div>


                <div className="grid grid-cols-5">
                  <div className="col-span-1 flex items-center gap-2">
                    <LuCalendarCheck className="text-gray-400" size={20} />
                    <p className="text-sm text-content-prompt capitalize font-[500]">Lable</p>
                  </div>
                  <div className="col-span-4">
                    <p className="text text-content-display capitalize">{new Date(startup.startupLabelDate).toDateString()}</p>
                  </div>
                </div>
                <div className="grid grid-cols-5">
                  <div className="col-span-1 flex items-center gap-2">
                    <GoNumber className="text-gray-400" size={20} />
                    <p className="text-sm text-content-prompt capitalize font-[500]">startup Sector</p>
                  </div>
                  <div className="col-span-4">
                    <Chip title={startup.startupActivitySector} variant="info" size="small" />
                  </div>
                </div>


                <div className="grid grid-cols-5">
                  <div className="col-span-1 flex items-center gap-2">
                    <LuText className="text-gray-400" size={20} />
                    <p className="text-sm text-content-prompt capitalize font-[500]">startup Description</p>
                  </div>
                  <div className="col-span-4">
                    <p className="text text-content-display capitalize">{startup.startupDescription}</p>
                  </div>
                </div>

              </div>

            </div>
          </div>


        </div>
        <div className="p-10 m-10  " ><ApexChart />

        </div>
      </div>
    </div>
  )
}
