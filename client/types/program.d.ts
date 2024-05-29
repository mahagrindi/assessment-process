interface ChallengeType {
  id?: string
  challengeTitle: string
  challengeRequirement: string
  challengeDescription: string
  challengeAdvantages: string[]
  challengeSub: string[]
  challengeKeyword: string[]
}

interface CohortType {
  id?: string
  cohortName: string
  cohortStatus: string
  cohortStartDate: string
  cohortEndDate: string
  cohortDuration: number
  cohortDescription: string
  program: Omit<ProgramType, 'cohorts'>
  challenges: ChallengeType[]
}

interface ProgramType {
  id?: string
  programPicture: string
  programName: string
  programIndustry: string
  programDescription: string
  programStartDate: string
  programEndDate?: string
  programEstimatedDuration: number
  programStatus: string
  createdAt: string
  provider: {
    id?: string
    programProviderName: string
    programProviderLogo?: string
    programProviderWebsite?: string
  }
  cohorts: CohortType[]
}

type ProgramResponseType = PageableType & {
  content: ProgramType[]
}

type CohortResponseType = PageableType & {
  content: CohortType[]
}
