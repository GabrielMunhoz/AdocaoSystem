import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Adocao } from 'src/model/adocao';

@Injectable({
  providedIn: 'root'
})
export class AdocaoService {
  baseUrl = '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  InserirAdocao(adocao: Adocao) : Observable<any>{

    return this.http.post<any>(this.baseUrl+"/api/adocao", adocao, this.httpOptions);
  }

  BuscarAdocao() : Observable<any>{
    
    return this.http.get(this.baseUrl+"/api/adocao");
  }
  BuscarAdocaoID(id) : Observable<any>{

    return this.http.get(this.baseUrl+"/api/adocao/"+id);
  }

  DeletarAdocao(id):Observable<any>{

    return this.http.delete<any>(this.baseUrl+"/api/adocao/"+id);
  }

  

}
