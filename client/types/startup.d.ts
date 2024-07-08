interface StartupType {
  id?: string
  startupName: string
  startupActivitySector: string
  startupLabelDate: string
  startupCreatedAt: string
  startupLogo?: string
  startupWebsite?: string
  startupEmail?: string
  startupPhone?: string
  startupFounders?: string
  startupDescription: string
  evaluations: string[]
}

type StartupResponseType = PageableType & {
  content: StartupType[]
}
