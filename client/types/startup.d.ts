interface StartupType {
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
}

type StartupResponseType = PageableType & {
  content: StartupType[]
}
