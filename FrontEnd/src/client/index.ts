import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiClientService {

  private domain = 'http://192.168.1.47:3000';
  //private domain = 'http://localhost:3000';

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

  public login(user: any): Observable<HttpResponse<any>> {
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

  public updateProduct(product:any):Observable<HttpResponse<any>> {
    let uri = `/api/UpdateProduct`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(product));
  }

  public makeOffer(offer:any):Observable<HttpResponse<any>> {
    let uri = `/api/MakeOffer`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(offer));
  }

  public acceptOffer(offer:any):Observable<HttpResponse<any>> {
    let uri = `/api/AcceptOffer`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(offer));
  }

  public rejectOffer(offer:any):Observable<HttpResponse<any>> {
    let uri = `/api/RejectOffer`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('post', uri, headers, params, JSON.stringify(offer));
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

  public getProductById(id:string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetProductById`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('get', uri, headers, params.set('productId',id), null);
  }

  public getAllHeadQuarters(): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetAllHeadQuarters`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('get', uri, headers, params, null);
  }

  public getAllCarriersByHeadquarter(id:string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetAllCarriersByHeadquarter`;
    let headers = new HttpHeaders();
    let params = new HttpParams().set('headquarter', 'resource:org.tfg.model.HeadQuarter#'+id);
    return this.sendRequest<any>('get', uri, headers, params, null);
  }

  public getMyOffers(product: string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetMyOffers`;
    let headers = new HttpHeaders();
    let params = new HttpParams().set('product','resource:org.tfg.model.Product#'+product);
    return this.sendRequest<any>('get', uri, headers, params, null);  
  }

  public getOffersDone(buyer: string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetOffersDone`;
    let headers = new HttpHeaders();
    let params = new HttpParams().set('buyer','resource:org.tfg.model.UserParticipant#'+buyer);
    return this.sendRequest<any>('get', uri, headers, params, null);  
  }

  public getOffersRejected(buyer: string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetOffersRejected`;
    let headers = new HttpHeaders();
    let params = new HttpParams().set('buyer','resource:org.tfg.model.UserParticipant#'+buyer);
    return this.sendRequest<any>('get', uri, headers, params, null);  
  }

  public getOfferById(id:string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetOfferById`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('get', uri, headers, params.set('offerId',id), null);
  }

  public getOrderById(id:string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetOrderById`;
    let headers = new HttpHeaders();
    let params = new HttpParams();
    return this.sendRequest<any>('get', uri, headers, params.set('orderId',id), null);
  }

  public getOrdersDone(buyer: string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetOrdersDone`;
    let headers = new HttpHeaders();
    let params = new HttpParams().set('buyer','resource:org.tfg.model.UserParticipant#'+buyer);
    return this.sendRequest<any>('get', uri, headers, params, null);  
  }

  public getMyOrders(product: string): Observable<HttpResponse<any>> {
    let uri = `/api/queries/GetMyOrders`;
    let headers = new HttpHeaders();
    let params = new HttpParams().set('product','resource:org.tfg.model.Product#'+product);
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