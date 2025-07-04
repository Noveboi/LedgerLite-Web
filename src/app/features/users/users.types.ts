import { Organization } from "../organizations/organizations.types";

export interface Role {
    id: string,
    name: string
}

export interface User {
    id: string,
    memberId: string | null,
    organization: Organization | null,
    organizationRoles: readonly Role[],
    email: string,
    username: string,
    fullName: string | null,
}