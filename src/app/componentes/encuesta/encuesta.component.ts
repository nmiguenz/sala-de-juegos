import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  formulario : FormGroup;

  constructor(private fb : FormBuilder) { 
    this.formulario = fb.group({
      nombre : ['',Validators.required],
      apellido : ['',Validators.required],
      edad : ['',[Validators.required, Validators.min(18),Validators.max(99)]],
      // telefono : [null,[Validators.required, Validators.maxLength(10),Validators.pattern('[0-9]')]],
      genero : ['',Validators.required],
      gusto : ['',Validators.required],
      opinion : ['',Validators.required]
    })
  }

  ngOnInit(): void {  
  }

  aceptar(){
    const datos = this.formulario.value;
    console.log(datos);
    console.log(this.formulario);
  }

  validarNombre(control:AbstractControl){
    const nombre = control.value;
    const tieneEspacio = nombre.includes(' ');
    if(tieneEspacio){
      return{ tieneEspacio : true}
    }
    
    return null;
  }

}
