export type AuthResponse = {
  resultCode: number
  messages: Array<string>
  data: DataResponseAuth
}

type DataResponseAuth = {
  userId: number
}
