import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pets } from 'src/model/pets';

@Injectable({
  providedIn: 'root'
})
export class PetsService {


  baseUrl = "";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this.baseUrl = baseUrl;



  }

  public BuscarTodosPets(): Observable<any> {

    return this.http.get<any>(this.baseUrl + '/api/pets/');

  }

  public DeletarPet(id: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/api/pets/' + id);
  }

  public BuscarPorId(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/api/pets/" + id);
  }

  public AddPet(pet: pets): Observable<any> {

    return this.http.post<any>(this.baseUrl + "/api/pets", pet, this.httpOptions);
  }

  public EditarPet(id: string, petAtualizado : pets) : Observable<any>{

    return this.http.put(this.baseUrl+"/api/pets/"+id, petAtualizado,this.httpOptions);
  }

}