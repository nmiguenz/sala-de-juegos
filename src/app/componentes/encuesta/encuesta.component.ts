import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dbService } from 'src/app/servicios/db.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  formulario : FormGroup;
  id : any = '';
  email : any = '';
  jugadorEncuesta = {};

  constructor(private fb : FormBuilder,
              private authSrv : AuthService,
              private baseService : dbService,
              private toastr : ToastrService,
              private router : Router) { 

    this.formulario = fb.group({
      nombre : ['',Validators.required],
      apellido : ['',Validators.required],
      edad : ['',[Validators.required, Validators.min(18),Validators.max(99)]],
      telefono : ['',[Validators.required, this.validarDiezNumerosTel]],
      genero : ['',Validators.required],
      gusto : ['',Validators.required],
      opinion : ['',[Validators.required,this.validarLength]]
    })
  }

  ngOnInit(): void {  
    this.obtenerDatosUserLog();
  }

  aceptar(){
    const datos = this.formulario.value;
    this.altaEncuesta(datos);
  }

  validarLength(control:AbstractControl){
      const campo = control.value;
      const largo = campo.length;
      if(largo <= 100 || largo >= 300 ){
        
        return {extension : true}
      }
      return false;
    }

  validarDiezNumerosTel(control : AbstractControl){
    const campo = control.value;
      const largo = campo.length;
      if(largo != 10 ){
        return {noDiezNumeros : true}
      }
      return false;
  }

  obtenerDatosUserLog(){
    this.authSrv.isLoggedIn().subscribe( arg =>{
        this.id = arg?.uid;
        this.email = arg?.email;
    })
  }

  altaEncuesta(datos : any){
    this.jugadorEncuesta = {
      id: this.id,
      email : this.email,
      nombre : datos.nombre,
      apellido : datos.apellido,
      edad : datos.edad,
      telefono : datos.telefono,
      genero : datos.genero,
      gusto : datos.gusto,
      opinion : datos.opinion
    }
    
    this.baseService.alta(this.jugadorEncuesta, 'Encusta').then(() => {
      this.toastr.success('La encuesta fue enviada con éxito', 'Gracias por responder', {
        positionClass: 'toast-bottom-right',
        timeOut: 10000,
      });
      datos.value = '';
      // this.router.navigate(['']);
    }).catch(error => {
      this.toastr.error('Se produjo un error al enviar la encuesta', 'Error al envair', {
        positionClass: 'toast-bottom-right',
        timeOut: 10000,
      });
      console.log(error)
    })
  }



}