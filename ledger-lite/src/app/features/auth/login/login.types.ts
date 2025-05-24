import { User } from "../../users/users.types"

export type LoginRequest = { 
    email: string,
    password: string
}

export type AccessTokenResponse = {
    accessToken: string
    refreshToken: string
    expiresIn: number
}