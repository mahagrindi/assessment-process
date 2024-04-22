"use client"
import React, { useState } from "react";
import type { ReactNode } from 'react';

export interface TabsProps {
     children ?: ReactNode;
     title: string;
}
// components/Accordion.js

import { useState } from 'react';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`mb-4 ${isOpen ? "border-l-4 border-gray-500 shadow-md" : "border-gray"} ease-in-out   duration-700 transition-all  `}>
      <div
        className={`flex justify-between items-center border-b-4  ease-in-out   duration-700 ${isOpen ? "border-gray-500 bg-gray-500 text-primary-white" : "border-gray"} p-4 cursor-pointer`}
        onClick={toggleAccordion}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <svg
          className={`w-6 h-6 ease-in-out   duration-700  ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 transition  delay-150 duration-700 ' : 'max-h-0'}`}>
        <div className="p-4 border-t">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
