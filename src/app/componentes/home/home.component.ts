import { Router } from '@angular/router';
import { User } from './../../clases/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLogged = false;
  public user : any;

  constructor(private authService:AuthService, private route: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(
      data => {
        this.user = data;
        if(this.user){
          this.isLogged = true;
        }
      },
      err => console.log(err)
    );
  }

  // No los
  onLogout(){
    this.authService.logOut().then( () => {
      console.log('Se cerró la sesión.');
      this.isLogged = false;
      console.log('Logout HOMe', this.isLogged.valueOf());
      //this.route.navigate([''])
    }).catch(() => console.log('Error en el logout.'));
  };

}
