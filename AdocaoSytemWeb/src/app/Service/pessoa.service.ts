import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endereco } from 'src/model/endereco';
import { User } from 'src/model/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  baseUrl = '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService) {
    this.baseUrl = baseUrl;
  }

  getPessoas(): Observable<any> {

      return this.http.get(this.baseUrl+'/api/pessoa/pessoas');
  }

  getPessoaId( id: string) : Observable<any>{

    return this.http.get(this.baseUrl+'/api/pessoa/'+id);

  }

  editarPessoa(id: string, pessoaEditar: User) : Observable<any>{

    return this.http.put<any>(this.baseUrl+'/api/pessoa/'+id, pessoaEditar, this.httpOptions);
  }
  
  deletarPessoa(id:string): Observable<any>{
    return this.http.delete<any>(this.baseUrl+'/api/pessoa/'+id);
  }

  inserirPessoa(pessoaNova: User): Observable<any>{
    return this.http.post<any>(this.baseUrl+'/api/pessoa',pessoaNova,this.httpOptions);

  }

  AssociarPessoaEndereco(pessoa: User, endere : endereco){

    this.getPessoaId(pessoa._id).subscribe(
      ok=> {
        let p = ok; 
        console.log(p); 
        if(p && endere){
          p.endereco = endere;

          this.editarPessoa(p._id, p).subscribe(
            dado=> {
              console.log("Associado com sucesso. "+ dado)
              return "Associado com sucesso. "
            },
            err=> {
              console.log('err' + err.message);

              if(err.status == 401){
                this.authService.logout();
              }
            }
          )
        }
      },

      err => {
        console.log("erro "+ err.message)
        if(err.status == 401){
          this.authService.logout();
        }
      }


    )
    
    return 'erro';

  }



}
