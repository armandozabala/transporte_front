import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomersService } from 'src/app/service/customers.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  users:any = [];
  p: number = 1;
  config:any;

  constructor(private customerService: CustomersService) { }

  ngOnInit(): void {

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.users.length
    }

    this.getUsers();



  }

  getUsers(){

    this.blockUI.start();

    this.users = [];

    this.customerService.getUsers(8).subscribe((res:any) => {

      console.log(res);

      this.users = res.results;

      this.blockUI.stop();

    });

  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  editUser(user:any){

  }

  deleteUser(user:any){


    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.customerService.removeUser(user.id).subscribe((res:any) => {

          console.log(res);

          if(res.ok){
            swal.fire('Info','User deleted','info');
            this.getUsers();
          }else{
            swal.fire('Error','Error delete user!','error');
          }

      });
      }
    })





  }


  key: string = 'id';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = ! this.reverse;
  }

}
