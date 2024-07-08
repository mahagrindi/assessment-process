export interface UserStore {
  isAuthenticated: boolean
  isLoading: boolean

  user: AuthUserProfileType
  error: ErrorAuthType

  login: (data: LoginType) => Promise<void>
  logout: () => Promise<boolean>
  emptyState: () => void
}

export const userStore: UserStore = {
  isAuthenticated: false,
  isLoading: false,

  user: {
    username: '',
    role: '',
    firstName: '',
    lastName: '',
    badgeNumber: '',
    isEligibleForEvaluation: false,
    authorities: [],
    cin: '',
  },

  error: {
    type: '',
    title: '',
    status: 0,
    detail: '',
    instance: '',
    description: '',
  },

  login: (data: LoginType) => new Promise<void>((resolve, reject) => {}),
  logout: () => new Promise<boolean>((resolve, reject) => {}),
  emptyState: () => {},
}
