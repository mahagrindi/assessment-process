interface ConsultantType {
  id?: string
  username: string
  password: string
  role: string
  accountNonLocked?: boolean
  accountNonExpired?: boolean
  credentialsNonExpired?: boolean
  enabled?: boolean
  createdAt?: string
  firstName: string
  lastName: string
  middleName?: string
  badgeNumber: string
  jobTitle?: string
  department?: string
  phoneNumber?: string
  eyEmployee?: boolean
  profileImage?: string
  notes?: string
  isEligibleForEvaluation: boolean

  authorities: Array<{
    authority: string
  }>
}

type ConsultantResponseType = PageableType & {
  content: ConsultantType[]
}
