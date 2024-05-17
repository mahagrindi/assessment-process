import * as yup from 'yup'

export const formSubAxeSchema = yup.object().shape({
  id: yup.string(),
  subaxe_name: yup.string().required('Sub-Axe name is required'),
  visibility: yup.boolean(), 
})
