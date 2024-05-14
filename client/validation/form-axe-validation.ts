import * as yup from 'yup'

export const formAxeSchema = yup.object().shape({
  id: yup.string(),
  axe_name: yup.string().required('Axe name is required'),
  visibility: yup.boolean(),
  description: yup.string().required('Axe description is required'),
})
