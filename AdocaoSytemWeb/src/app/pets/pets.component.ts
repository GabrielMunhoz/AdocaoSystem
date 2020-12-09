import { Component, OnInit } from '@angular/core';
import { PetsService } from '../Service/pets.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  public pets = [];
  mensagem='';

  constructor(private petsService: PetsService) { }

  ngOnInit(): void {
    this.carregarTodosPets();
  }


  deletarPet(id){

    this.petsService.DeletarPet(id).subscribe(suc => {

      this.mensagem = "Deletado com sucesso"

    } , err=>{
      this.mensagem = 'Falha ao deletar'
      console.log(err.message);
    });
  }

  carregarTodosPets(){
    this.petsService.BuscarTodosPets().subscribe(
      dados => {
        console.log(dados);
        this.pets = dados;
      },
      err => {
        console.log(err.message)
      }
    )
  }

}
