import * as yup from 'yup'

export const formAxeSchema = yup.object().shape({
  id: yup.string(),
  axeName: yup.string().required('Axe name is required'),
  axeDescription: yup.string(),
  status: yup.boolean(),
})

export const formAxeDefaultValues: yup.InferType<typeof formAxeSchema> = {
  id: '',
  axeName: '',
  axeDescription: '',
  status: false,
}
