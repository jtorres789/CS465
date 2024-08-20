import { Injectable, Provider } from '@angular/core'; 
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { AuthenticationService } from '../services/authentication.service'; 

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Determine if the request is to a public API
    const isAuthAPI = request.url.includes('login') || request.url.includes('register');

    // If the user is logged in and the request is not to a public API
    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      const token = this.authenticationService.getToken();
      // Clone the request and set the Authorization header
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      // Pass the cloned request with the new header to the next handler
      return next.handle(authReq);
    }

    // Otherwise, pass the request unaltered to the next handler
    return next.handle(request);
  }
}

export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
