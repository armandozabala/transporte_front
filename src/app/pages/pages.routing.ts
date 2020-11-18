import { CustomersComponent } from './customers/customers.component';
import { RoutesComponent } from './routes/routes.component';
import { CustomerexcelComponent } from './customerexcel/customerexcel.component';
import { LoadexcelComponent } from './loadexcel/loadexcel.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficasComponent } from './graficas/graficas.component';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: 'dashboard',component: PagesComponent,
    children:[
      { path: '', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'loadexcel', component: LoadexcelComponent },
      { path: 'customerload', component: CustomerexcelComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'routes', component: RoutesComponent },
      { path: 'vehicles', component: VehiclesComponent },
      { path: 'graficas', component: GraficasComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
