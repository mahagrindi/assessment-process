import * as yup from 'yup'

export const formulairSchema = yup.object().shape({
  id: yup.string(),
  title: yup.string().required('title is required'),
  sections: yup.array().required('sections are required'),
  challenges: yup.array().required('challenges are required'),
  description: yup.string().min(100, 'the description is not long enough').max(500, 'the description is too long').required('description is required').trim(),
})
