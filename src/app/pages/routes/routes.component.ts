import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomersService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  key: string = 'id';
  reverse: boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  routes:any = [];
  p: number = 1;
  config:any;


  constructor(private customerService: CustomersService) { }

  ngOnInit(): void {

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.routes.length
    }

      this.getRoutes();

  }


  getRoutes(){

    this.blockUI.start();

    this.customerService.getRoutes().subscribe((res:any) => {

      console.log(res);

      this.routes = res.results;

      this.blockUI.stop();

    });

  }


  sort(key){
    this.key = key;
    this.reverse = ! this.reverse;
  }

  pageChanged(event){
    this.config.currentPage = event;
  }


  editRoute(item:any){}

  deleteRoute(item:any){}


}
