import { ResultadoComponent } from './resultado/resultado.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { GolpearCarpinchoComponent } from './golpear-carpincho/golpear-carpincho.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { IniciarJuegoComponent } from './iniciar-juego/iniciar-juego.component';


@NgModule({
  declarations: [
    AhorcadoComponent,
    MayorMenorComponent,
    GolpearCarpinchoComponent,
    PreguntadosComponent,
    ResultadoComponent,
    IniciarJuegoComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
  ]
})
export class JuegosModule { }
