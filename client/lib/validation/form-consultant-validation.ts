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
  createdAt: yup.string(),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  middleName: yup.string(),
  badgeNumber: yup.string().required('Badge number is required'),
  jobTitle: yup.string(),
  department: yup.string(),
  phoneNumber: yup.string(),
  eyEmployee: yup.boolean(),
  profileImage: yup.string(),
  notes: yup.string(),
  isEligibleForEvaluation: yup.boolean(),
})
