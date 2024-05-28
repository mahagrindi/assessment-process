import * as yup from 'yup'

export const formCohortSchema = yup.object().shape({
  id: yup.string(),
  cohortName: yup.string().required('Cohort name is required'),
  cohortStatus: yup.string().required('Cohort status is required'),
  cohortStartDate: yup.string().required('Cohort start date is required'),
  cohortEndDate: yup.string().required('Cohort end date is required'),
  cohortDuration: yup.number().min(1, 'cohort should at least last 1 week').required('Cohort duration is required'),
  cohortDescription: yup.string(),
})

export const formCohortDefaultValues: yup.InferType<typeof formCohortSchema> = {
  id: '',
  cohortName: '',
  cohortStatus: '',
  cohortStartDate: '',
  cohortEndDate: '',
  cohortDuration: 0,
  cohortDescription: '',
}
