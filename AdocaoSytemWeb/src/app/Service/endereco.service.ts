import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endereco } from 'src/model/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  baseUrl = '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  InserirEndereco(ende : endereco) : Observable<any>{
    
    return this.http.post<any>(this.baseUrl+"/api/pessoa/enderecos", ende, this.httpOptions)
  }

  AtualizarEndereco(id,ende : endereco) : Observable<any>{
    
    return this.http.put<any>(this.baseUrl+"/api/pessoa/enderecos/"+id, ende, this.httpOptions)
  }

  BuscarEnderecos(): Observable<any>{
    return this.http.get<any>(this.baseUrl+"/api/pessoa/");
  }

  BuscarEnderecosID(id): Observable<any>{
    return this.http.get<any>(this.baseUrl+"/api/pessoa/enderecos/"+id);
  }

  DeletarEnderecoID(id): Observable<any>{
    return this.http.delete<any>(this.baseUrl+"/api/pessoa/enderecos/"+id);
  }


}
