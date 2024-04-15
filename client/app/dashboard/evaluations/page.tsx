'use client'
// pages/YourPageName.tsx
import React, { useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import { FormBuilderHeader } from '@/components/Form-builder/form-builder-header';
import { AddChallenges } from '@/components/Form-builder/add-challenges';
import { AddFormSection } from '@/components/Form-builder/add-form-section';
export default function YourPageName() { 

  return (
    <div>
      <FormBuilderHeader />
      <br />
      <RichTextEditor />
      <br />
      <AddChallenges />
      <br />
      <AddFormSection />

    </div>
  );
}
