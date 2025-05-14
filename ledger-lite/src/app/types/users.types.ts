export interface User {
    id: string,
    organizationId: string | null,
    email: string,
    username: string,
    fullName: string | null,
}