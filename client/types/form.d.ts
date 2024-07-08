interface ForumType {
  id?: string
  formName: string
  formDescription: string
  status: boolean
  programCohortEntity: CohortType
  createdAt: Date
  questions: ForumQuestionType[]
}

interface ForumQuestionType {
  id: string
  questionName: string
  questionHint?: string
  questionType: string
  options: string[]
  questionOrder: string
  forum: Omit<ForumType, 'questions'>
}

type ForumResponseType = PageableType & {
  content: ForumType[]
}
