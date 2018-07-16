import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.headers.get('X-Frame-Options') === ' DENY') {
          this.snackBar.open('log in ', null, {
            duration: 4000
          });
        }
        const header = event.headers.get('X-Frame-Options:');
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 0) {
          this.snackBar.open('Please, log in', null, {
            duration: 4000
          });
        }
      }
    });
  }
}
