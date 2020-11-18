import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficasComponent } from './graficas/graficas.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { UsersComponent } from './users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { LoadexcelComponent } from './loadexcel/loadexcel.component';
import { BlockUIModule } from 'ng-block-ui';
import { CustomerexcelComponent } from './customerexcel/customerexcel.component';
import { RoutesComponent } from './routes/routes.component';
import { CustomersComponent } from './customers/customers.component';
import { EntregasComponent } from './entregas/entregas.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficasComponent,
    PagesComponent,
    UsersComponent,
    VehiclesComponent,
    LoadexcelComponent,
    CustomerexcelComponent,
    RoutesComponent,
    CustomersComponent,
    EntregasComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    GraficasComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    NgxPaginationModule,
    OrderModule,
    BlockUIModule.forRoot()
  ]
})
export class PagesModule { }
