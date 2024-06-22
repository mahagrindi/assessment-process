
import React, { ReactElement } from 'react'
import { LuBarChartHorizontal } from "react-icons/lu";
import { MdOutlineLink } from 'react-icons/md'

interface ConsultantsCardProps {
  count: number;
  text:string;
  color:string ;
  icon : ReactElement ;
}

const ConsultantsCard: React.FC<ConsultantsCardProps> = ({ count, icon , text, color}) => {
  return (

    <div className="h-24 mx-auto border-2 rounded-md w-72 m-5 ">
      <div className="flex flex-row items-center justify-items-starty h-full space-x-5 ">
        <div className={'bg-'+color+'-100  text-primary-'+color+' rounded-full ml-2 p-4'}>
          {icon}
        </div>
        <div className="flex flex-col ">
          <h2 className="text-lg font-semibold text-gray-700">{text}</h2>
          <p className="text-xl font-bold text-gray-900">{count}</p>
        </div>
      </div>
    </div>


  );
};

export default ConsultantsCard;