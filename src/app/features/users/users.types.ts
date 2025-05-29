import { Organization } from "../organizations/organizations.types";

export interface User {
    id: string,
    organization: Organization | null,
    email: string,
    username: string,
    fullName: string | null,
}