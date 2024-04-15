interface ConsultantType {
  id: string
  fullName: string
  username: string
  email: string
  password: string
  role: string
  isAccountNonLocked: boolean
  isAccountNonExpired: boolean
  isCredentialsNonExpired: boolean
  isEnabled: boolean
  createdAt: string
  authorities: Array<{
    authority: string
  }>
  accountNonExpired: boolean
  credentialsNonExpired: boolean
  accountNonLocked: boolean
  enabled: boolean
}

type ConsultantResponseType = PageableType & {
  content: ConsultantType[]
}
