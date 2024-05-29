import * as yup from 'yup'

export const formSubAxeSchema = yup.object().shape({
  id: yup.string(),
  axeSubName: yup.string().required("Sub Axe's name is required"),
  axeSubDescription: yup.string(),
  status: yup.boolean(),
  axeSubWeight: yup.number().required(),
})

export const formSubAxeDefaultValues: yup.InferType<typeof formSubAxeSchema> = {
  id: '',
  axeSubName: '',
  axeSubDescription: '',
  status: true,
  axeSubWeight: 0,
}
