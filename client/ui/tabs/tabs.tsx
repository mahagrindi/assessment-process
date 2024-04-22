 
"use client"
import React from "react";
import type { ReactNode } from 'react';

export interface TabsProps {
  child1: ReactNode;
  child2: ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ child1, child2 }) => {
  const [openTab, setOpenTab] = React.useState(0);

  const activeTabClass = "text-primary-gray shadow-lg bg-primary-white border-b-4 border-primary-yellow";
  const inactiveTabClass = "text-gray-400 shadow-sm border-gray-200 border-b-4";

  const handleTabClick = (tabIndex: number) => {
    setOpenTab(tabIndex);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <ul className="flex mb-0 list-none flex-wrap flex-row" role="tablist">
          <li className="-mb-px mt-5 last:mr-0 flex-auto text-center">
            <a
              className={`text-sm ease-in-out   duration-700 transition-all  font-semibold uppercase px-5 py-5 block leading-normal ${openTab === 0 ? activeTabClass : inactiveTabClass}`}
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(0);
              }}
              href="#link0"
              role="tab"
            >
              General Information
            </a>
          </li>
         
          <li className="-mb-px mt-5 last:mr-0 flex-auto text-center">
            <a
              className={`text-sm ease-in-out   duration-700 transition-all  font-semibold uppercase px-5 py-5 block leading-normal ${openTab === 1 ? activeTabClass : inactiveTabClass}`}
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(1);
              }}
              href="#link1"
              role="tab"
            >
              History of Assessment
            </a>
          </li>
         
        </ul>
        <div className="relative bg-primary-white flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 0 ? 'block' : 'hidden'} id="link0">
                {child1}
              </div>
              <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                {child2}
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
