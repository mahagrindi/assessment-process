import * as yup from 'yup'

export const formProgramSchema = yup.object().shape({
  id: yup.string(),
  programPicture: yup.string().required('Program picture is required'),
  programName: yup.string().required('Program name is required'),
  programIndustry: yup.string().required('Program industry is required'),
  programDescription: yup.string().required('Program description is required'),
  programStartDate: yup.string().required('Program start date is required'),
  programEndDate: yup.string(),
  programEstimatedDuration: yup.number().min(2, 'programs usually takes longer.').required('Program estimated duration is required'),
  programStatus: yup.string().required('Program status is required'),
  provider: yup.object().shape({
    id: yup.string(),
    programProviderName: yup.string().required("Provider's name is required"),
    programProviderLogo: yup.string(),
    programProviderWebsite: yup.string().url("Provider's website must be a valid URL"),
  }),
})

export const formProgramDefaultValues: yup.InferType<typeof formProgramSchema> = {
  id: '',
  programPicture: '',
  programName: '',
  programIndustry: '',
  programDescription: '',
  programStartDate: '',
  programEndDate: '',
  programEstimatedDuration: 1,
  programStatus: '',
  provider: {
    id: '',
    programProviderName: '',
    programProviderLogo: '',
    programProviderWebsite: '',
  },
}
