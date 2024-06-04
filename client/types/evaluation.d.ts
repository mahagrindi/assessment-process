interface FormEvaluation {
  id?: string
  createdAt?: string
  createdBy?: string
  version?: string
  title: string
  challenges: Array<string>
  description: string
  sections: Array<Section>
}

type FormEvaluationResponseType = FormEvaluation
interface ChallengesType {
  id: string
  title: string
  description: string
}

type ChallengesResponseType = PageableType & {
  content: ChallengesType[]
}

type ChallengesTypelist = ChallengesType[]
