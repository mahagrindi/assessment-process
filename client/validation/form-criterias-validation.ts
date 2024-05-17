import * as yup from 'yup'

export const formCriteriasSchema = yup.object().shape({
  id: yup.string(),
  criterionName: yup.string().required('criterion  is required'),
  visibility: yup.boolean(),
})
