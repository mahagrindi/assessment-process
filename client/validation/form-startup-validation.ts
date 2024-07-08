import * as yup from 'yup'

export const formStartupSchema = yup.object().shape({
  id: yup.string(),
  startupLogo: yup.string(),
  startupName: yup.string().required('Startup name is required'),
  startupLabelDate: yup.string().required('Startup label date is required'),
  startupActivitySector: yup.string().required('Startup activity sector is required'),
  startupWebsite: yup.string().url('Website must be a valid URL'),
  startupEmail: yup.string().email('Email must be a valid email'),
  startupPhone: yup.string(),
  startupFounders: yup.string(),
  startupDescription: yup.string().required('Startup description is required'),
})

export const formStartupDefaultValues: yup.InferType<typeof formStartupSchema> = {
  id: '',
  startupLogo: '',
  startupName: '',
  startupLabelDate: '',
  startupActivitySector: '',
  startupWebsite: '',
  startupEmail: '',
  startupPhone: '',
  startupFounders: '',
  startupDescription: '',
}
