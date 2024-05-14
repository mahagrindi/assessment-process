interface CohortType {
  id?: string
  cohortName: string
  cohortStatus: string
  cohortStartDate: string
  cohortEndDate: string
  cohortDuration: number
  cohortDescription: string
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
