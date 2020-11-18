import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomersService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  key: string = 'id';
  reverse: boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  customers:any = [];
  p: number = 1;
  config:any;


  constructor(private customerService: CustomersService) { }

  ngOnInit(): void {

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.customers.length
    }


    this.getCustomers();

  }


  getCustomers(){

    this.blockUI.start();

    this.customerService.getCustomers().subscribe((res:any) => {

      console.log(res);

      this.customers = res.results;

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

  editCustomer(us:any){}

  deleteCustomer(us:any){}

}
