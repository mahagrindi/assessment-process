type LoginType = {
  email: string
  password: string
}

type TokenType = {
  token: string
  expiresIn: nnumber
}

type ErrorAuthType = {
  type: string
  title: string
  status: number
  detail: string
  instance: string
  description: string
}
