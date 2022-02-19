import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RootScopeService } from './root-scope.service';

@Injectable({
  providedIn: 'root'
})
export class CommunicationsService {

  constructor(
    private http: HttpClient,
    private rootScope: RootScopeService,
    private router: Router
  ) { }

  get = (slug: string, s: any, f: any, p?: any, data?: any, custom?: any) => {
    this.call("GET", slug, s, f, p, data, custom);
  }

  post = (slug: string, data: any, s: any, f: any, p?: any, custom?: any) => {
    this.call("POST", slug, s, f, p, data, custom);
  }

  put = (slug: string, data: any, s: any, f: any, p?: any, custom?: any) => {
    this.call("PUT", slug, s, f, p, data, custom);
  }

  patch = (slug: string, data: any, s: any, f: any, p?: any, custom?: any) => {
    this.call("PATCH", slug, s, f, p, data, custom);
  }

  delete = (slug: string, data: any, s: any, f: any, p?: any, custom?: any) => {
    this.call("DELETE", slug, s, f, p, data, custom);
  }

  public call = (method: string, slug: string, s: any, f: any, p: any, payload?: any, custom?: any) => {
    var url = "";
    if (!custom || !custom.noUrlPrefix) {
      url = this.rootScope.APP_ROOT_URL + slug;
    } else {
      url = slug;
    }
    const httpRequest = new HttpRequest(method, url, payload, {
      headers: new HttpHeaders(custom && custom.headers || {}),
      reportProgress: custom && custom["reportProgress"] || false,
      responseType: custom && custom["responseType"] || "json",
      withCredentials: true
    });
    this.http.request(httpRequest).subscribe((event: HttpEvent<any>) => {
      if (event) {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request sent!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header received!');
            break;
          case HttpEventType.DownloadProgress:
            console.log(`Download progress`);
            break;
          case HttpEventType.Response:
            switch (event.status) {
              case 200:
              case 204:
                s(event.body);
                break;
              default:
                f(event.body);
                break;
            }
            break;
        }
      }
      this.rootScope.updateRequestsCount("REMOVE");
    }, (error: Response) => {
      if (error instanceof HttpErrorResponse) {
        let macreError: any = {
          error: { description: '', message: '', reasons: [], confirmLoginUrl: '' },
          headers: {},
          message: '',
          name: '',
          ok: false,
          status: 200,
          statusText: 'OK',
          url: ''
        };
        macreError = error ? error : macreError;
        if (macreError.status === 401 && macreError.url.indexOf('login') === -1) {
          this.router.navigate(['login']);
          f(macreError.error);
        } else {
          f(macreError.error);
        }
      }
      this.rootScope.updateRequestsCount("REMOVE");
    });
  }
}
