import * as yup from 'yup'

export const formForumSchema = yup.object().shape({
  id: yup.string(),
  formName: yup.string().required('Form name is required'),
  formDescription: yup.string(),
  status: yup.boolean(),

  questions: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      questionName: yup.string().required('Question name is required'),
      questionHint: yup.string(),
      questionType: yup.string().required('Question type is required'),
      options: yup.array().of(yup.string()),
      questionOrder: yup.string().required('Question order is required'),
    })
  ),
})

export const formForumDefaultValues: yup.InferType<typeof formForumSchema> = {
  id: '',
  formName: '',
  formDescription: '',
  status: false,
  questions: [],
}
