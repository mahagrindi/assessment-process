interface LoginType {
  username: string
  password: string
}

interface TokenType {
  token: string
  expiresIn: nnumber
}

interface ErrorAuthType {
  type: string
  title: string
  status: number
  detail: string
  instance: string
  description: string
}

interface AuthUserProfileType extends Omit<LoginType, 'password'> {
  id?: string
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
