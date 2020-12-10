import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pets } from 'src/model/pets';
import { AuthService } from '../Service/auth.service';
import { PetsService } from '../Service/pets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pets = [];

  public auxPets: pets[];
  constructor(private petsService: PetsService, private router:Router, private authService: AuthService) { 

    this.buscarTodosPets();
  }


  ngOnInit(): void {
  }

  buscarTodosPets(){
    this.petsService.BuscarTodosPets().subscribe(
      dados => {
        this.pets = dados;
        // this.pets = this.pets.filter(x => x.adotado == false);

        this.auxPets = dados;
        console.log(dados);

      },
      err => {

        console.log("Erro - " + err);

        if(err.status == 401){
          this.authService.logout();
        }
      }
    )
  }

  abrirPet(id){
    
    if(id){

      this.router.navigate(['/adocao/informacoes/'+id]);
      
    }

  }

  public pesquisarPet(value: string) {

    this.pets = this.auxPets.filter(valu => valu.apelido.includes(value), err => {
      if(err.status == 401){
        this.authService.logout();
      }
    });
 }

}
