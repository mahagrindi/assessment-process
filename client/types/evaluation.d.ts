interface EvaluationType {
  id?: string
  evaluationScore: number
  evaluationFeedback: string
  evaluationDate: Date
  cohort: CohortType
  startup: StartupType
}

type EvaluationResponseType = PageableType & {
  content: EvaluationType[]
}
