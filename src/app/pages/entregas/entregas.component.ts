import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomersService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css']
})
export class EntregasComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  entregas:any = [];
  p: number = 1;
  config:any;
  key: string = 'id';
  reverse: boolean = false;

  constructor(private customerService: CustomersService) { }

  ngOnInit(): void {

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.entregas.length
    }

  }


  getEntregas(){

    this.blockUI.start();

    this.customerService.getVehicles().subscribe((res:any) => {

      console.log(res);

      this.entregas = res.results;

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


  editEntrega(item:any){}

  deleteEntrega(item:any){}

}
