export type User = {
  _id: string
  name: string
  email: string
  image?: string
  tokens?: string[]
}

export type SignUpRequest = {
  name: string
  email: string
  password: string
}

export type LoginRequest = { email: string; password: string }

export type LoginResponse = {
  user: User
  accessToken: string
  refreshToken: string
}

export type UpdateUser = Omit<User, "tokens" | "image"> & { image: File }
