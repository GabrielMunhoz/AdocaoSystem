import { Component, OnInit } from '@angular/core';
import { AdocaoService } from 'src/app/Service/adocao.service';
import { Adocao } from 'src/model/adocao';

@Component({
  selector: 'app-informacoes-adocao',
  templateUrl: './informacoes-adocao.component.html',
  styleUrls: ['./informacoes-adocao.component.css']
})
export class InformacoesAdocaoComponent implements OnInit {

  adocoes : Adocao[];
  adocoesInfo : Adocao[];
  mensagem = '';

  constructor(private adocaoService: AdocaoService) { }

  ngOnInit(): void {
    this.adocoes = [];
    this.adocoesInfo = [];

    this.adocaoService.BuscarAdocao().subscribe(
      ok=>{
        this.adocoesInfo = ok;
        this.preencherAdocoes();
      },
      err=>{
        this.mensagem = err.message;
      }
    )
    
    
  }

  preencherAdocoes() {
    if(this.adocoesInfo){
      for(let adocoaoInfo of this.adocoesInfo) {
        this.adocaoService.BuscarAdocaoID(adocoaoInfo._id).subscribe(
          ok => {
            console.log(ok)
            this.adocoes.push(ok);
          },
          err => {}
        )
      };

    }
  }

  deletarAdocao(id){
    this.adocaoService.DeletarAdocao(id).subscribe(
      ok=>{
        let idx = this.adocoes.findIndex( p => p._id === id);

        this.adocoes.splice(idx,1);
      
        this.mensagem = "Deletado com sucesso"
        
        console.log(ok);
      }
      ,
      err=> {
        console.log(err);
      });
    
  }

}
