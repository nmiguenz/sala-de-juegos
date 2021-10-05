import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servicios/auth.service';
import { JugadorService } from 'src/app/servicios/jugador.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User = new User();
  jugador : any;
  
  registerForm = new FormGroup({
    email : new FormControl(''), 
    password : new FormControl(''),
    cpassword : new FormControl(''),
  })
  
  constructor(private authService:AuthService, 
              private route:Router,
              private toastr:ToastrService,
              private jugadorSrv:JugadorService) { }
  
  ngOnInit(): void {
  }
  
  //Comportamiento al registrar un usuario nuevo
  async onRegister(){
    this.user = this.registerForm.value;
    try {
      if(this.user.password === this.user.cpassword){
        await this.authService.register(this.user).then(()=>{
          
          this.toastr.success('El usuario se creo con éxito', 'Nuevo usuario',{
            timeOut:3000,
            positionClass:'toast-bottom-right'
          });

          //Obtengo el ID de inicio de sesión
          this.authService.isLoggedIn().subscribe(arg => {
            if(arg){
              this.user.iduser = arg.uid;

              let jugador : any;
            //Log de ingreso a la plataforma
            jugador = this.logIngreso(this.user.iduser);
            this.jugadorSrv.alta(this.jugador, 'logsLoginRegister');
            }
            else
              this.user.iduser = ''
          });

          //Redirecciona a la home
          this.route.navigate(['']);
        });
      }
    }
    catch(error){
      console.log(error);
    }
  }

  logIngreso(id:string){

    return this.jugador = {
      iduser: id,
      email : this.registerForm.value.email,
      fechaIngreso: new Date()
    }
  }

}