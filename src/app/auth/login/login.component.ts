import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/users';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Users;

  constructor(private authService: AuthService, private router: Router) {
      this.user = new Users();
  }

  ngOnInit(): void {
      /*console.log(this.authService.usuario);
      if(this.authService.isAuthenticated()){
          swal.fire('Login','Hola '+this.authService.usuario.nombre+" ya esta authenticado",'info');
          this.router.navigate(['/dashboard']);
      }*/

  }


  login(){
      //console.log(this.user);
      if(this.user.email == ""){
         swal.fire('Error Login','Email','error');
         return;
      }

      this.authService.login(this.user).subscribe((res:any) => {

          console.log(res);

          if(res.ok){
            this.router.navigateByUrl('/dashboard');
            //swal.fire('Login','Hola ','success');
          }else{
            swal.fire('Error','Error usuario o clave incorrectas!','error');
          }

         /* this.authService.guardarUsuarios(res.access_token);
          this.authService.guardarToken(res.access_token);

          let usuario = this.authService.usuario;*/


      }, err =>{

          if(err.status == 400){
            swal.fire('Error','Error usuario o clave incorrectas!','error');
          }

      });

  }

}
