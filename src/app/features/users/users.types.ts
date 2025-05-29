export interface User {
    id: string,
    organization: Organization | null,
    email: string,
    username: string,
    fullName: string | null,
}

export interface Organization {
    id: string,
    name: string,
}