import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiClientService {

  private domain = 'http://localhost:3000';

  constructor(private http: HttpClient, @Optional() @Inject('domain') domain: string) {
    if (domain) {
      this.domain = domain;
    }
  }

  public createUser(user: any): Observable<HttpResponse<any>> {
    let uri = `/api/CreateUser`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(user));
  }


  public Login(user: any): Observable<HttpResponse<any>> {
    let uri = `/api/Login`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(user));
  }
  
  public updateProfile(updateProfile:any):Observable<HttpResponse<any>> {
    let uri = `/api/UpdateProfile`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(updateProfile));
  }


  public uploadProduct(product:any):Observable<HttpResponse<any>> {
    let uri = `/api/UploadProduct`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(product));
  }


  /*--------QUERIES--------*/
  public getUserById(id:string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetUserById`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('get', uri, headers, params.set('userId',id), null);
  }

  public getAllProducts(): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetAllProducts`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('get', uri, headers, params, null);
  }

  public getProducts(owner: string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetProducts`;
    let headers = new HttpHeaders();
    let params = new HttpParams().set('owner','resource:org.tfg.model.UserParticipant#'+owner);
    return this.sendRequest<any>('get', uri, headers, params, null);
  }

  public getMyProducts(owner: string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetMyProducts`;
    let headers = new HttpHeaders();
    let params = new HttpParams().set('owner','resource:org.tfg.model.UserParticipant#'+owner);
    return this.sendRequest<any>('get', uri, headers, params, null);  
  }






  private sendRequest<T>(method: string, uri: string, headers: HttpHeaders, params: HttpParams, body: any): Observable<HttpResponse<T>> {
    if (method === 'post') {
      return this.http.post<T>(this.domain + uri, body, { headers: headers.set('Content-Type', 'application/json'), params: params, observe: 'response' });
    } else if (method === 'get') {
      return this.http.get<T>(this.domain + uri, { headers: headers.set('Accept', 'application/json'), params: params, observe: 'response' });
    } else if(method === 'delete'){
      return this.http.delete<T>(this.domain + uri, { headers: headers.set('Content-Type', 'application/json'), params: params, observe: 'response' });
    }
  }
}