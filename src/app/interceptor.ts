import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
      Promise<HttpEvent<any>> {
    const token = '96fab0d0541bd055248b5012f947db5319c5516a9d721c0c62f'
    + '846fa19541229414835bea7b238ab93d823dd6c7ce49ae32dd93365375e6542a2783686347a9b';
    let changedRequest = request;
    // HttpHeader object immutable - copy values
    const headerSettings: {[name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    headerSettings['Authorization'] = 'Bearer ' + token;
    headerSettings['Content-Type'] = 'application/json';
    headerSettings['Origin'] = 'localhost:4200';
    headerSettings['Access-Control-Request-Headers'] = 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept';
    headerSettings['Access-Control-Request-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE';
    headerSettings['Access-Control-Allow-Origin'] = '*';
    headerSettings['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE';
    headerSettings['Access-Control-Allow-Headers'] = 'Authorization, Lang, Access-Control-*, Origin, X-Requested-With,'
     + 'Content-Type, Accept';
    headerSettings['Access-Control-Allow-Credentials'] = '*';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader});
    return next.handle(changedRequest).toPromise();
  }

}