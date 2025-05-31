import { Organization } from "../organizations/organizations.types";

export interface User {
    id: string,
    organization: Organization | null,
    organizationRoles: readonly string[],
    email: string,
    username: string,
    fullName: string | null,
}