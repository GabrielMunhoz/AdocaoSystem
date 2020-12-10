import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { PessoaService } from 'src/app/Service/pessoa.service';
import { User } from 'src/model/User';

@Component({
  selector: 'app-form-pessoas',
  templateUrl: './form-pessoas.component.html',
  styleUrls: ['./form-pessoas.component.css']
})
export class FormPessoasComponent implements OnInit {

  mensagem = '';
  id: string;
  user = new User();

  constructor(
    private pService: PessoaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = '' + this.route.snapshot.params['id'];
    console.log(this.id);
    if (this.id) {
      this.preenchePessoa(this.id);
      console.log(this.user);
    }

  }

  preenchePessoa(id: string) {
    this.pService.getPessoaId(this.id).subscribe(dado => this.user = dado, err => {
      if (err.status == 401) {
        this.authService.logout();
      }
    });
  }

  cadastrar(_id: string) {
    if (!_id) {

      if (this.validaUsuario()) {

        this.pService.inserirPessoa(this.user).subscribe(
          ok => {
            this.mensagem = ok.nome + ' cadastrado com sucesso';
          },
          err => {
            this.mensagem = this.user.nome + 'Falha ao cadastrar';
            if (err.status == 401) {
              this.authService.logout();
            }
          });
        this.user = new User();
      }


    } else {
      this.pService.editarPessoa(this.id, this.user).subscribe(ok => {
        this.mensagem = this.user.nome + ' editado com sucesso';
      },
        err => {
          this.mensagem = this.user.nome + 'Falha ao editar';
          if(err.status == 401){
            this.authService.logout();
          }
        });
    }
  }

  cancelar() {
    this.router.navigate(['/pessoa']);
    // this.router.navigate(['/produtos/edit', '1']);
  }

  validaUsuario(): boolean {
    if (this.user.nome == undefined || this.user.nome == null) {

      this.mensagem = `Nome do Usuario, está vazio, Por favor preencher o nome`;
      return false;
    }
    if (this.user.usuario == undefined) {
      this.mensagem = `Usuario do ${this.user.nome}, está vazio, Por favor preencher o usuario`;
      return false;
    }

    if (this.user.cpf != this.user.cpf) {
      this.mensagem = `CPF do Usuario ${this.user.nome}, deve ser preenchido`;
      return false;
    }

    if (this.user.fone != this.user.fone) {
      this.mensagem = `Fone do Usuario ${this.user.fone}, deve ser preenchido`;
      return false;
    }

    if (this.user.senha == undefined) {
      this.mensagem = `Senha do Usuario ${this.user.nome}, está vazia, Por favor preencher a senha`;
      return false;
    }

    if (this.user.senha != this.user.confirmarSenha) {
      this.mensagem = `Senha do Usuario ${this.user.nome}, está diferente, Por favor preencher a mesma senha`;
      return false;
    }
    

    return true;

  }
}
