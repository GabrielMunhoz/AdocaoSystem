import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { EnderecoService } from 'src/app/Service/endereco.service';
import { PessoaService } from 'src/app/Service/pessoa.service';
import { endereco } from 'src/model/endereco';
import { User } from 'src/model/User';

@Component({
  selector: 'app-form-endereco',
  templateUrl: './form-endereco.component.html',
  styleUrls: ['./form-endereco.component.css']
})
export class FormEnderecoComponent implements OnInit {

  mensagem = '';
  id: string;
  user = new User();
  endereco = new endereco();

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
      console.log(this.user);
    }

  }

  preencheEndereco(id: string) {
    this.eService.BuscarEnderecosID(id).subscribe(
      ok => {
        this.endereco = ok;
      },
      err => {
        console.log(err);

        if (err.status == 401) {
          this.authService.logout();
        }
      }
    )
  }

  cadastrarEndereco() {
    if (this.endereco._id) {

      this.eService.AtualizarEndereco(this.endereco._id, this.endereco).subscribe(
        ok => {
          this.mensagem = `O seguinte endereço foi atualizado com sucesso ${ok.rua}`;

          this.router.navigate(['/pessoa']);
        },
        err => {
          console.log(err.message); 

          if (err.status == 401) {
            this.authService.logout();
          }
        }

      )

    } else {
      this.eService.InserirEndereco(this.endereco).subscribe(
        ok => {
          console.log(ok);
          this.mensagem = `O seguinte endereço foi registrado com sucesso ${ok.rua}`;
          this.router.navigate(['/pessoa'])
        },
        err => {
          console.log('Erro ' + err)
          if (err.status == 401) {
            this.authService.logout();
          }

        }

      )
    }
  }

}
