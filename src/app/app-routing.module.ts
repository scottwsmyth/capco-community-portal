import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UserComponent } from "./components/user/user.component";
import { SignupComponent } from "./components/user/signup/signup.component";

const routes: Routes = [
  { path: "", component: NavbarComponent },
  {
    path: "signup",
    component: UserComponent,
    children: [
      {
        path: "",
        component: SignupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
