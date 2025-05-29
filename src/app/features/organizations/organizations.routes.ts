import { Routes } from "@angular/router";
import { CreateOrganizationFormComponent } from "./create-organization-form/create-organization-form.component";

export const ORG_ROUTES: Routes = [
    { path: 'create', component: CreateOrganizationFormComponent }
]