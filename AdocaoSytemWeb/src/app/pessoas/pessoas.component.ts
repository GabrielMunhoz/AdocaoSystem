import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/User';
import { AuthService } from '../Service/auth.service';
import { PessoaService } from '../Service/pessoa.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  users: User[];
  mensagem = ''; 
  constructor(private pessoaService: PessoaService, private authService: AuthService) { }

  ngOnInit(): void {
    this.users = [];
    this.carregarTodasPessoa();
  }

  deletarPet(id){

    this.pessoaService.deletarPessoa(id).subscribe(suc => {

      let idx = this.users.findIndex( p => p._id === id);

      this.users.splice(idx,1);
      
      this.mensagem = "Deletado com sucesso"

    } , err=>{
      this.mensagem = 'Falha ao deletar'
      
      if(err.status == 401){
        this.authService.logout();
      }
      console.log(err.message);
    });
  }

  carregarTodasPessoa(){
    this.pessoaService.getPessoas().subscribe(
      dados => {
        console.log(dados);
        this.users = dados;
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
