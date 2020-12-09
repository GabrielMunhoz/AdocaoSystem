import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/model/User';
import { inject } from '@angular/core/testing';
import { DadosConexao } from 'src/model/dadosConexao';
import { stringify } from 'querystring';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    baseUrl = ""

    redirectUrl:string;


    dadosConexao: DadosConexao;
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
        private router: Router
    ) {
        this.baseUrl = baseUrl;
    }

    login(user: User) {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }

        return this.http.post<DadosConexao>(this.baseUrl + '/api/pessoa/login', JSON.stringify(user), httpOptions);
    }

    setSession(dadosConexao: DadosConexao) {
        if (dadosConexao) this.dadosConexao = dadosConexao;

        
        localStorage.setItem('dadosConexao', JSON.stringify(dadosConexao));

        // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem("dadosConexao");

        this.router.navigate(['/login']);
    }

    isLoggedIn(): boolean {
        if(this.getDadosConexao() != null){
            // let dadosCn: DadosConexao;
            // dadosCn = JSON.parse(localStorage.getItem("dadosConexao"));
            if(this.dadosConexao != undefined)
                return this.dadosConexao.auth == true;
            return false;    
        }else{
            return false;
        }
    }

    getDadosConexao(){
        
        this.dadosConexao = JSON.parse(localStorage.getItem("dadosConexao"));

        return this.dadosConexao;
    }

    isAdmin() : boolean{
        if(this.getDadosConexao()){
            this.dadosConexao.role == 'admin'
            return true;
        }
        else{
            return false;
        }
    }
    isLoggedOut() {
        

    }

    // getExpiration() {
    //     const expiration = localStorage.getItem("expires_at");
    //     const expiresAt = JSON.parse(expiration);
    // }    
}