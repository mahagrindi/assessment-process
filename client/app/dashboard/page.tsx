import React, { JSX } from 'react'
import ChartLine from '@/components/ChartLine'
import { ContentHeader } from '@/components/content-header'
import { Linker } from '@/ui/link'
import { LuAirplay, LuBarChartHorizontal, LuCalendarCheck, LuCalendarDays, LuFileClock, LuPlusCircle, LuShieldCheck, LuText, LuTimer, LuUser2, LuUserSquare } from 'react-icons/lu'
import { MdOutlineLink } from 'react-icons/md'
import ConsultantsCard from '@/ui/ConsultantsCard'
import { GoNumber } from 'react-icons/go'
import { Chip } from '@/ui/chip'
import { AnimatedTooltip } from '@/components/animated-tooltip-images'
import { DataTable } from '@/ui/storybook/data-table'
import { openAssesmentColumns } from '@/app/dashboard/_data/opaned-assessment-dashbord'

export default function Page(): JSX.Element {
  return  (
    <div className="h-full min-h-full w-full">
      <ContentHeader
        title={'Dashboard'}
      />

      <div className="bg-primary-white flex flex-col  border-t-[2px] border-gray-200">
        <div className="grid grid-cols-5 gap-2  items-start justify-items-starty">
          <ConsultantsCard count={145} color="red" icon={<LuUser2 />} text="Experts" />
          <ConsultantsCard count={145} color="blue" icon={<LuBarChartHorizontal />} text="Startup" />
          <ConsultantsCard count={145} color="yellow" icon={<LuFileClock />} text="Open Assessment" />

          <ConsultantsCard count={145} color="orange" icon={<LuBarChartHorizontal />} text="Assesed Startup" />
          <ConsultantsCard count={145} color="green" icon={<LuShieldCheck />} text="Startup Trused By EY " />


        </div>
        <div className="flex items-start justify-items-starty flex-row gap-x-10">


          <div className="basis-1/2">
            <div className=" ml-5 ">

              <h2 className="text-2xl font-bold text-content-display capitalize mb-2">Current Programme : Start & Tread</h2>
              <div className="relative bg-primary-white flex flex-col gap-4 border-[2px] border-gray-200 p-6">
                <div>
                  <h2 className="text-xl font-bold text-content-display capitalize">details</h2>
                  <p className="text-sm text-content-prompt mb-1">The information that describes the cohort and its requirements.</p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-5">
                    <div className="col-span-1 flex items-center gap-2">
                      <LuAirplay className="text-gray-400" size={20} />
                      <p className="text-sm text-content-prompt capitalize font-[500]">cohort</p>
                    </div>
                    <div className="col-span-4">
                      <p className="text text-content-display capitalize">cohortName</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-1 flex items-center gap-2">
                      <LuCalendarCheck className="text-gray-400" size={20} />
                      <p className="text-sm text-content-prompt capitalize font-[500]">From</p>
                    </div>
                    <div className="col-span-4">
                      <p className="text text-content-display capitalize">12/06/2024</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-1 flex items-center gap-2">
                      <LuCalendarDays className="text-gray-400" size={20} />
                      <p className="text-sm text-content-prompt capitalize font-[500]">To</p>
                    </div>
                    <div className="col-span-4">
                      <p className="text text-content-display capitalize">01/07/2024</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-1 flex items-center gap-2">
                      <LuTimer className="text-gray-400" size={20} />
                      <p className="text-sm text-content-prompt capitalize font-[500]">Duration</p>
                    </div>
                    <div className="col-span-4">
                      <p className="text text-content-display capitalize">2 weeks</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-1 flex items-center gap-2">
                      <GoNumber className="text-gray-400" size={20} />
                      <p className="text-sm text-content-prompt capitalize font-[500]">cohort challenges</p>
                    </div>

                  </div>

                  <div className="grid grid-cols-5">
                    <div className="col-span-1 flex items-center gap-2">
                      <LuText className="text-gray-400" size={20} />
                      <p className="text-sm text-content-prompt capitalize font-[500]">cohort Description</p>
                    </div>
                    <div className="col-span-4">
                      <p className="text text-content-display capitalize">cohortDescription</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5">
                    <div className="col-span-1 flex items-center gap-2">
                      <LuUserSquare className="text-gray-400" size={20} />
                      <p className="text-sm text-content-prompt capitalize font-[500]">cohort program</p>
                    </div>
                    {/*   <div className='col-span-4'>
                  <div className='flex flex-row items-center gap-2'>
                    <div>
                      {cohort.program.programPicture ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cohort.program.programPicture} alt={cohort.program.programName} className='flex w-10 h-10 rounded-full' />
                      ) : (
                        <div className='flex w-10 h-10 rounded-full items-center justify-center bg-yellow-600 leading-7 font-[550] border border-yellow-700 uppercase'>
                          <p>{cohort.program.programName[0]}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className='text-sm text-content-display capitalize'>{cohort.program.programName}</p>
                      <p className='text-xs text-content-prompt capitalize'>provider: {cohort.program.provider.programProviderName}</p>
                    </div>
                  </div>
                </div>
              </div>
             */}
                  </div>
                </div>

                <div className="relative bg-primary-white flex flex-col border-t-[2px] border-gray-200 gap-4 p-6 mt-6">
                  <div>
                    <h2 className="text-xl font-bold text-content-display capitalize">Expert consultants</h2>
                    <p className="text-sm text-content-prompt mb-1">The cohort challenges that are currently available for the cohort.</p>
                  </div>
                  <div className="col-span-4">
                    <AnimatedTooltip items={people} />
                  </div>
                </div>

              </div>

            </div>
          </div>


          <div className=" w-full w-max">

            <DataTable rounded data={[]} columns={openAssesmentColumns} />


          </div>
        </div>


      </div>
    </div>


  )
}
const people = [
  {
    id: 1,
    name: 'John Doe',
    designation: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
  },
  {
    id: 2,
    name: 'Robert Johnson',
    designation: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    name: 'Jane Smith',
    designation: 'Data Scientist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 4,
    name: 'Emily Davis',
    designation: 'UX Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 5,
    name: 'Tyler Durden',
    designation: 'Soap Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
  },
  {
    id: 6,
    name: 'Dora',
    designation: 'The Explorer',
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80',
  },
]
