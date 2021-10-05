import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../clases/user';
import { ToastrService } from 'ngx-toastr';
import { JugadorService } from './../../servicios/jugador.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  public loginForm : FormGroup;

  user : User = new User();

  constructor(
    private auth:AuthService, 
    private route:Router, 
    private fb: FormBuilder,
    private jugadorSrv: JugadorService,
    private toastr: ToastrService) {
      
      this.loginForm = this.fb.group({
        email :  new FormControl('', [Validators.required, Validators.email]),
        password : new FormControl('',[Validators.required, Validators.minLength(8)])
      })
  }

  //Pasos después de que el servicio devuelve el estado del login
  async onLogin(){
    this.user = this.loginForm.value;

    try {
      const result = await this.auth.login(this.user);
      if(result){
        //Obtengo el ID de inicio de sesión
        this.auth.isLoggedIn().subscribe(arg => {
          if(arg){
            this.user.iduser = arg.uid;

            let jugador : any
            //Log de ingreso a la plataforma
            jugador = this.logIngreso(this.user.iduser);
            this.jugadorSrv.alta(jugador, 'logsLoginRegister');
            jugador = ''; 
          }
          else
            this.user.iduser = ''
        });
        
        //Redirect to the route
        this.route.navigate(['']);
      }
    } catch (error) {
      console.log('Error en onLogin loginComponent. ',error);
    }
  }

  logIngreso(id:string){
    return {
      iduser: id,
      email : this.loginForm.value.email,
      fechaIngreso: new Date()
    }
  }

  //Completa el login con un usuario de test
  rellenarForm($event:any){
    $event.preventDefault();
    this.loginForm.setValue({
      email: 'test@utn.com',
      password : 'test123'
    })
  }
  
}
