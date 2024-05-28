import * as yup from 'yup'

export const formChallengeSchema = yup.object().shape({
  id: yup.string(),
  challengeTitle: yup.string().required('Challenge name is required'),
  challengeDescription: yup.string().required('Challenge description is required'),
  challengeRequirement: yup.string().required('Challenge requirement is required'),
  challengeAdvantages: yup.array().of(yup.string()).required('Challenge advantages is required'),
  challengeSub: yup.array().of(yup.string()),
  challengeKeyword: yup.array().of(yup.string()).min(1, 'At least one challenge keyword is required').required('Challenge keyword is required'),
})

export const formChallengeDefaultValues: yup.InferType<typeof formChallengeSchema> = {
  id: '',
  challengeTitle: '',
  challengeDescription: '',
  challengeRequirement: '',
  challengeAdvantages: [],
  challengeSub: [],
  challengeKeyword: [],
}
