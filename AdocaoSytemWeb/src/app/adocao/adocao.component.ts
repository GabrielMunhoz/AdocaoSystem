import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adocao } from 'src/model/adocao';
import { pets } from 'src/model/pets';
import { User } from 'src/model/User';
import { AdocaoService } from '../Service/adocao.service';
import { AuthService } from '../Service/auth.service';
import { PessoaService } from '../Service/pessoa.service';
import { PetsService } from '../Service/pets.service';

@Component({
  selector: 'app-adocao',
  templateUrl: './adocao.component.html',
  styleUrls: ['./adocao.component.css']
})
export class AdocaoComponent implements OnInit {

  idPet = '';
  querAdotar = false;
  pet = new pets();
  adocao = new Adocao()
  pessoas: User[];
  mensagem = '';

  constructor(
    private petService: PetsService,
    private pessoaService: PessoaService,
    private adocaoService: AdocaoService,
    private authService : AuthService,

    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.pessoas = [];
    this.preenchePessoas();
    this.idPet = '' + this.route.snapshot.params['id'];
    if(this.idPet){
      console.log(this.idPet);
      this.preenchePet(this.idPet);
    }
  }

  preenchePet(id){

    this.petService.BuscarPorId(id).subscribe(ok =>{

      this.pet = ok;

    }, err=>{

      console.log(err.message)
      
      if(err.status == 401){
        this.authService.logout();
      }
    })
  }

  preenchePessoas(){

    this.pessoaService.getPessoas().subscribe(
      ok =>{
        this.pessoas = ok;

      },
      err =>{
        console.log(err.message);
        if(err.status == 401){
          this.authService.logout();
        }
      }
    )
  }

  adotar(){
    this.querAdotar = true;
  }

  confirmarAdocao(idPet){
    this.adocao.Pet._id = idPet;
    this.adocao.datahora = new Date();

    console.log(this.adocao)

    this.adocaoService.InserirAdocao(this.adocao).subscribe(
      ok=>{
        this.mensagem = "Adoção realizada com sucesso";
        
        this.router.navigate(['/home']);
      },
      err=>{
        this.mensagem = "Algo deu errado";
        if(err.status == 401){
          this.authService.logout();
        }
      }
    )


  }

  deletarAdocao(id){
    this.adocaoService.DeletarAdocao(id).subscribe(
      ok=>{
        console.log(ok);
      }
      ,
      err=> {
        console.log(err);
        if(err.status == 401){
          this.authService.logout();
        }
      });
    
  }

}
