import { User } from "../../../types/users.types"

export type LoginRequest = { 
    email: string,
    password: string
}

export type LoginResponse = {
    accessToken: string
    refreshToken: string
    expiresIn: number
}