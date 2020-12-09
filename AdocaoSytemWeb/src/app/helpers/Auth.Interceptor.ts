import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const dadosConexao = JSON.parse(localStorage.getItem("dadosConexao"));

        if (dadosConexao) {

            let cloned = req.clone({
                headers: req.headers.set("x-access-token",
                    dadosConexao.token).append('role', dadosConexao.role)

            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}