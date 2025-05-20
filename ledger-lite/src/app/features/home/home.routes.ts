import { Route } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { CreateOrganizationFormComponent } from "../organizations/create-organization-form/create-organization-form.component";

export const HOME_ROUTES: Route[] = [
    { path: '', component: HomePageComponent },
    { path: 'organizations', children: [
        { path: 'create', component: CreateOrganizationFormComponent }
    ]}
]