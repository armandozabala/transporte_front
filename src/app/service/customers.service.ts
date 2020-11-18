import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private urlEndPoint = 'http://localhost:5000/restaurantearm/us-central1/app'; //'https://us-central1-restaurantearm.cloudfunctions.net/app';

  private httpHeaders = new HttpHeaders({ 'Content-Type' : 'application/json'});


  constructor(private authService: AuthService, private http: HttpClient) { }

  private addAuth(){

     let token = this.authService.token;

     if(token != null){
        return this.httpHeaders.append('Authorization','Bearer '+token);
     }

     return this.httpHeaders;
  }

  registerEntregas(data:any){

    return this.http.post(this.urlEndPoint+'/registerentregas', data).pipe(
      catchError(e => {
          return throwError(e);
      })
  );
  }

  registerCustomersExcel(data:any){

    return this.http.post(this.urlEndPoint+'/regcustomerexcel', data).pipe(
      catchError(e => {
          return throwError(e);
      })
  );
  }


  getVehicles(){
    return this.http.get(this.urlEndPoint+'/allvehiculos').pipe(
        catchError(e => {
            return throwError(e);
        })
    );
  }

  getRoutes(){
    return this.http.get(this.urlEndPoint+'/allrutas/8').pipe(
        catchError(e => {
            return throwError(e);
        })
    );
  }

  getCustomers(){
    return this.http.get(this.urlEndPoint+'/allcustomers').pipe(
        catchError(e => {
            return throwError(e);
        })
    );
  }

  getUsers(idOperacion:any){
      return this.http.get(this.urlEndPoint+'/allusers/'+idOperacion).pipe(
          catchError(e => {
              return throwError(e);
          })
      );
  }

  removeUser(id:any){
    return this.http.delete(this.urlEndPoint+'/user/'+id).pipe(
      catchError(e => {
          return throwError(e);
      })
  );
  }
}
