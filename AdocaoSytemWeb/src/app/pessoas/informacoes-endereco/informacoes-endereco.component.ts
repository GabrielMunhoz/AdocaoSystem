import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { EnderecoService } from 'src/app/Service/endereco.service';
import { endereco } from 'src/model/endereco';

@Component({
  selector: 'app-informacoes-endereco',
  templateUrl: './informacoes-endereco.component.html',
  styleUrls: ['./informacoes-endereco.component.css']
})
export class InformacoesEnderecoComponent implements OnInit {

  enderecos: endereco[];
  endereco: endereco;
  mensagem = '';
  id: string;

  constructor(
    private eService: EnderecoService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = '' + this.route.snapshot.params['id'];
    console.log(this.id);
    if (this.id) {
      this.preencheEndereco(this.id);
    }

  }

  preencheEndereco(id: string) {
    this.eService.BuscarEnderecosID(id).subscribe(
      ok=>{
        this.endereco = ok;
      },
      err=>{
        console.log(err);

        if (err.status == 401) {
          this.authService.logout();
        }
      }
    )
  }
}
