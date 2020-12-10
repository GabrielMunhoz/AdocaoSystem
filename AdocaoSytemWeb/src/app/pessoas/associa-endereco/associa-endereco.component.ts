import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { EnderecoService } from 'src/app/Service/endereco.service';
import { PessoaService } from 'src/app/Service/pessoa.service';
import { endereco } from 'src/model/endereco';
import { User } from 'src/model/User';

@Component({
  selector: 'app-associa-endereco',
  templateUrl: './associa-endereco.component.html',
  styleUrls: ['./associa-endereco.component.css']
})
export class AssociaEnderecoComponent implements OnInit {


  enderecos: endereco[];
  pessoas: User[];
  endereco: endereco;
  pessoa: User;
  mensagem = '';


  constructor(
    private eService: EnderecoService,
    private pService: PessoaService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.enderecos = [];
    this.pessoas = [];
    this.endereco =  new endereco();
    this.pessoa = new  User();
    this.preenchePessoa();
    this.preencheEndereco();

  }
  preencheEndereco() {
    
    this.eService.BuscarEnderecos().subscribe(
      ok=>{
        this.enderecos = ok;
      },
      err=>{
        console.log(err);

        if (err.status == 401) {
          this.authService.logout();
        }
      }
    )

  }
  preenchePessoa() {
    this.pService.getPessoas().subscribe(
      dados => {
        console.log(dados);
        this.pessoas = dados;
      },
      err => {
        console.log(err.message)
        
        if(err.status == 401){
          this.authService.logout();
        }
      }
    )
  }

  associar(){
    this.mensagem =  this.pService.AssociarPessoaEndereco(this.pessoa, this.endereco);
  }
}
