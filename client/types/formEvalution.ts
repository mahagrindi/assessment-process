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
