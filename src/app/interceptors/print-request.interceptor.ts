import { Injectable } from '@angular/core';
import { HttpEvent, HTTP_INTERCEPTORS, HttpInterceptor, HttpHandler, HttpRequest, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class PrintRequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`${new Date().toDateString()}  ${req.url} ${req.method}`);

    return next.handle(req);
  }
}