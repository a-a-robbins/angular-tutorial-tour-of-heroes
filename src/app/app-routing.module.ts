import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from "./heroes/heroes.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import  { HeroDetailComponent } from "./hero-detail/hero-detail.component";

const routes: Routes = [
  //path = URL to the page, component = what component to create when going to this route
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent}
];

//initializes the router and starts listening
@NgModule({
  //configuring to use the routes from above Routes[] array
  imports: [RouterModule.forRoot(routes)],
  //exports routes to be used throughout app
  exports: [RouterModule]
})
export class AppRoutingModule { }
