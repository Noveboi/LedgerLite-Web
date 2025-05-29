import { Routes } from "@angular/router";
import { CreateOrganizationFormComponent } from "./create-organization-form/create-organization-form.component";
import { JoinOrganizationComponent } from "./join-organization/join-organization.component";
import { NoOrganizationPageComponent } from "./pages/no-organization-page/no-organization-page.component";

export const ORG_ROUTES: Routes = [
    { 
        path: '', 
        component: NoOrganizationPageComponent,
        children: [
            { path: 'create', component: CreateOrganizationFormComponent },
            { path: 'join', component: JoinOrganizationComponent }
        ]
    }

]