import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../clases/user';
import { first } from 'rxjs/operators'; //importa FIRST()
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  codigoError : string = '';

  constructor( 
    private auth:AngularFireAuth, 
    public afs: AngularFirestore,   // Inject Firestore service
    ) { }

  async login(user:User) : Promise<any> {
    try {
      return await this.auth.signInWithEmailAndPassword(user.email!,user.password);
    } catch (error) {
      console.log(error.message);
    } 
  }

  async register(user:User) : Promise<any>{
    try {
      return await this.auth.createUserWithEmailAndPassword(user.email!, user.password);
    } catch (error) {
      console.log('Error al crear User', error);
    }
  }

  //Cierra la sesión del usuario
  logOut() {
    return this.auth.signOut();
  }

  //Devuelve un observable con el estado.
  isLoggedIn() {
    return this.auth.authState;
  }

  //Obtengo al usuario logueado!
  getCurrentUser() : any{
      return this.auth.authState.pipe(first()).subscribe( user =>{
      });
  }
}
