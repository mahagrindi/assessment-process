import React, { FC, forwardRef, TextareaHTMLAttributes } from 'react';

interface ComponentProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label: string;
  hint?: string;
  error?: string;
  value?: string;
  required?: boolean; // Added the missing required prop
}

export const Textarea: FC<ComponentProps> = forwardRef<HTMLTextAreaElement, ComponentProps>(
  ({ label, value, hint, required = false, ...rest }, ref) => (
    <div>
      {label && (
        <label htmlFor={label} className="text-sm font-[500] tracking-wide capitalize text-content-prompt">
          <span>{label}</span>
        </label>
      )}
      <textarea
        className="px-2 h-[60px] disabled:bg-gray-100 disabled:pointer-events-none rounded outline-none w-full border-primary-border text-sm focus:border-gray-500 focus:ring-gray-500"
        placeholder={hint}
        value={value}
     
        {...rest}
        ref={ref}
      ></textarea>
    </div>
  )
);
