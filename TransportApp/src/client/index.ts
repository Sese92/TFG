import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiClientService {

  private domain = 'http://192.168.1.47:3000';
  //private domain = 'http://localhost:3000'

  constructor(private http: HttpClient, @Optional() @Inject('domain') domain: string) {
    if (domain) {
      this.domain = domain;
    }
  }

  public pickUpProduct(order: any): Observable<HttpResponse<any>> {
    let uri = `/api/PickUpProduct`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(order));
  }

  public deliverProduct(order: any): Observable<HttpResponse<any>> {
    let uri = `/api/DeliverProduct`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(order));
  }

  
  /*--------QUERIES--------*/
  public getCarrierById(id:string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetCarrierById`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('get', uri, headers, params.set('carrierId',id), null);
  }

  public getOrdersByStatusAndCarrierId(carrierId:string, status:string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetOrdersByStatusAndCarrierId`;
    let headers = new HttpHeaders();
    let params = new HttpParams().set('status', status).set('carrier','resource:org.tfg.model.Carrier#'+carrierId);
    return this.sendRequest<any>('get', uri, headers, params, null);
  }

  public getUserById(id:string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetUserById`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('get', uri, headers, params.set('userId',id), null);
  }

  public getProductById(id:string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetProductById`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('get', uri, headers, params.set('productId',id), null);
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