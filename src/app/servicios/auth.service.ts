import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../clases/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
      console.log('Error en login de AuthService' ,error);
    } 
  }

  async register(user:User) : Promise<any>{
    try {
      return await this.auth.createUserWithEmailAndPassword(user.email!, user.password);
    } catch (error) {
      console.log('Error en register de AuthService' ,error);
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
}
