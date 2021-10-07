import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogged = false;
  public user : any;
  constructor(private authService:AuthService, private route:Router) { }

  ngOnInit() {

    this.authService.isLoggedIn().subscribe(
      data => {
        this.user = data;
        if(this.user){
          this.isLogged = true;
        }
        else this.isLogged = false;
      },
      err => console.log(err)
    );
  }

  onLogout(){
    this.authService.logOut().then( () => {
      console.log('Se cerró la sesión.');
      this.authService.estaLogueado = false //bandera para el Guard
      this.isLogged = false;
      //this.route.navigate[('')]
    }).catch(() => console.log('Error en el logout.'));
  };
  
}
