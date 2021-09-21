import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { RegisterComponent } from './componentes/register/register.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'quien-soy', component: QuienSoyComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'ahorcado', component: AhorcadoComponent} //Luego sacarlo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
