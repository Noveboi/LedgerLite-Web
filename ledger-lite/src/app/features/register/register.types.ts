export interface RegisterRequest {
    email: string,
    password: string,
    username?: string | null,
    firstName?: string | null,
    lastName?: string | null
}