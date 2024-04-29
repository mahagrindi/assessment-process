import * as yup from 'yup'

export const formConsultantSchema = yup.object().shape({
  id: yup.string(),
  username: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  role: yup.string().required('Role is required'),
  accountNonLocked: yup.boolean(),
  accountNonExpired: yup.boolean(),
  credentialsNonExpired: yup.boolean(),
  enabled: yup.boolean(),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  middleName: yup.string().nullable(),
  badgeNumber: yup.string().required('Badge number is required'),
  jobTitle: yup.string().required('Job title is required'),
  department: yup.string().required('Department is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  eyEmployee: yup.boolean(),
  profileImage: yup.string().nullable(),
  notes: yup.string().nullable(),
  isEligibleForEvaluation: yup.boolean(),
  cin: yup.string().required('CIN is required').min(8, 'National ID must be at least 8 characters'),
})
