import * as yup from 'yup'

export const formCriteriaSchema = yup.object().shape({
  id: yup.string(),
  axeSubCriteriaName: yup.string().required("Criteria's name is required"),
  axeSubCriteriaDescription: yup.string(),
  status: yup.boolean(),
  axeSubCriteriaWeight: yup.number().required(),
})

export const formCriteriaDefaultValues: yup.InferType<typeof formCriteriaSchema> = {
  id: '',
  axeSubCriteriaName: '',
  axeSubCriteriaDescription: '',
  status: true,
  axeSubCriteriaWeight: 0,
}
