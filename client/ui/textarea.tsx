'use client'
import React, { FC } from 'react';

interface TextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const Textarea: FC<TextareaProps> = ({ label, value, onChange }) => (
  <div className='flex flex-col items-start gap-1 self-stretch'>
    {label && (
      <label htmlFor={label} className='text-sm font-[500] tracking-wide capitalize text-content-prompt'>
        <span>{label}</span>
      </label>
    )}
    <textarea
      className="px-2 disabled:bg-gray-100 disabled:pointer-events-none rounded outline-none w-full border-primary-border text-sm focus:border-gray-500 focus:ring-gray-500 h-[40px]"
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></textarea>
  </div>
);

export default Textarea;