interface LoginType {
  email: string
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
  id: string
  fullName: string
  username: string
  role: string
  isAccountNonLocked: boolean
  isAccountNonExpired: boolean
  isCredentialsNonExpired: boolean
  isEnabled: boolean
  createdAt: string
  enabled: boolean
  authorities: Array<{
    authority: string
  }>
  accountNonLocked: boolean
  accountNonExpired: boolean
  credentialsNonExpired: boolean
}
