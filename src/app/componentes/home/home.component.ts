import { Router } from '@angular/router';
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

  constructor(private authService:AuthService,
              private route: Router) {}

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

  // actionButton() {
  //   this.ahorcado.nativeElement.classList.remove('modal')
  // }

  redirigeAlJuego( juego : string){

    var url = '/juegos';

    //Quito las propiedades modales
    // this.elemento.removeClass('modal');

    this.route.navigate([`${url}/${juego}`]);
  }

}
