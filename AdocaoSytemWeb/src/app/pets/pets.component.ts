import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { PetsService } from '../Service/pets.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  public pets = [];
  mensagem='';

  constructor(
    private petsService: PetsService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.carregarTodosPets();
  }


  deletarPet(id){

    this.petsService.DeletarPet(id).subscribe(suc => {

      let idx = this.pets.findIndex( p => p._id === id);

      this.pets.splice(idx,1);
      
      this.mensagem = "Deletado com sucesso"

    } , err=>{
      this.mensagem = 'Falha ao deletar'
      
      if(err.status == 401){
        this.authService.logout();
      }

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

        if(err.status == 401){
          this.authService.logout();
        }
      }
    )
  }

}
