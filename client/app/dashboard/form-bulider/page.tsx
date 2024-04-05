'use client'
// pages/YourPageName.tsx
import React, { useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import { FormBuilderHeader } from '@/components/form-builder-header';
import { AddChallenges } from '@/components/add-challenges';
export default function YourPageName() { 

  return (
    <div>
      <FormBuilderHeader />
      <br />
      <RichTextEditor />
      <br />
      <AddChallenges />
      <br />

    </div>
  );
}
