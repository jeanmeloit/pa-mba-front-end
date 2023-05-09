export interface User {
  uuid: string
  name: string
  email: string
  phone: string
  age: number
  password?: string
  token?: string
  accessLevel?: string
  canAccessTill?: Date
  createdAt?: string
  updatedAt?: string
}
