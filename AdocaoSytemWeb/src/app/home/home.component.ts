import { Component, OnInit } from '@angular/core';
import { PetsService } from '../Service/pets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pets = [];

  constructor(private petsService: PetsService) { 

    this.buscarTodosPets();
  }


  ngOnInit(): void {
  }

  buscarTodosPets(){
    this.petsService.BuscarTodosPets().subscribe(
      dados => {
        this.pets = dados;
        console.log(dados);

      },
      err => {

        console.log("Erro - " + err);
      }
    )
  }
}
