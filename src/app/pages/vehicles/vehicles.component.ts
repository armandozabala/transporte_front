import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomersService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  vehicles:any = [];
  p: number = 1;
  config:any;


  constructor(private customerService: CustomersService) { }

  ngOnInit(): void {

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.vehicles.length
    }


    this.getVehicles();

  }

  getVehicles(){

    this.blockUI.start();

    this.customerService.getVehicles().subscribe((res:any) => {

      console.log(res);

      this.vehicles = res.results;

      this.blockUI.stop();

    });

  }


  key: string = 'id';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = ! this.reverse;
  }


  pageChanged(event){
    this.config.currentPage = event;
  }


  editVehicle(item:any){}

  deleteVehicle(item:any){}

}
