import { Users } from './../model/users';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint = 'http://localhost:5000/restaurantearm/us-central1/app'; //'https://us-central1-restaurantearm.cloudfunctions.net/app';

  private httpHeaders = new HttpHeaders({ 'Content-Type' : 'application/json'});

  private _usuario: Users;
  private _token: string;

  constructor(private http: HttpClient, private router: Router) { }

  private isNotAutorizado(e){



    if(e.status == 401 || e.status == 403){
       this.router.navigate(['/login']);
       return true;
    }

  }

  isAuthenticated(){
      let payload = this.obtenerDatosToken(this.token);

      if(payload != null && payload.email && payload.email.length > 0){
          return true;
      }

      return false;
  }

  public get usuario(){

    if(this._usuario != null){
       return this._usuario
    }else if(this._usuario == null && sessionStorage.getItem('usuarios')!=null){
       this._usuario = JSON.parse(sessionStorage.getItem('usuarios'));
       return this._usuario;
    }

    return new Users();
  }

  public get token(){

    if(this._token != null){
       return this._token
    }else if(this._token == null && sessionStorage.getItem('token')!=null){
       this._token = sessionStorage.getItem('token');
       return this._token;
    }
    return null;
  }


  obtenerDatosToken(accessToken:any){

    let datos = JSON.parse(atob(accessToken.split(".")[1]));

    return datos;

  }

  guardarUsuarios(accessToken: string){

      let datos = JSON.parse(atob(accessToken.split(".")[1]));

      console.log(datos);

      this._usuario = new Users();

      this._usuario.nombre = datos.name;
      this._usuario.apellido = datos.lastname;
      this._usuario.email = datos.email;
      this._usuario.roles = datos.authorities;

      sessionStorage.setItem('usuarios', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string){

    this._token = accessToken;
    sessionStorage.setItem('token', this._token);

  }

  logout(){
     this._token = null;
     this._usuario = null;
     sessionStorage.clear();
  }

  login(users: Users){

      let params = {
          email: users.email,
          password: users.password
      }

      return this.http.post(this.urlEndPoint+"/auth", params);
  }

  create(cliente: any){

    return this.http.post(this.urlEndPoint, cliente, { headers: this.httpHeaders })
    .pipe(
       map((response:any) => response.cliente ),
       catchError(e => {
            swal.fire(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
       })
    )

  }


}
