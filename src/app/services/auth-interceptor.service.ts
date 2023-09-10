import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAuthToken();

    if(token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization',`Bearer ${token}`)
      });
      return next.handle(authReq);
    }
    /*
      If no token is found, it means we make requests for login/register, so no token needed.
     */
    return next.handle(req);
  }
}
