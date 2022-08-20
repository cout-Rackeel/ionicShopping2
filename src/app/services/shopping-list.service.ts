import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Items } from '../models/items';
import { APIResponse } from '../models/api-response';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private API_URL = "http://localhost:3000/api/v1/shopping-list";

  private _handleHttpErrors(retVal: any) {
    return(err: any) => {
      console.log(err);
      return of({
        status: err.status,
        message: err.message,
        data: retVal
      });
    }
  }

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<APIResponse<Items[]>>{
    return this.http.get<APIResponse<Items[]>>(this.API_URL).pipe(catchError(this._handleHttpErrors([])))
  }

  getItemById(id:string): Observable<APIResponse<Items>>{
    return this.http.get<APIResponse<Items>>(this.API_URL + '/'+ id).pipe(catchError(this._handleHttpErrors(new Items())));
  }

  createItem(data:Items): Observable<APIResponse<Items>>{
    return this.http.post<APIResponse<Items>>(this.API_URL, data).pipe(catchError(this._handleHttpErrors(new Items())));
  }

  updateItem(id: string, data:Partial<Items>): Observable<APIResponse<Items>>{
    return this.http.put<APIResponse<Items>>(this.API_URL + '/' + id, data).pipe(catchError(this._handleHttpErrors(new Items())));
  }

  deleteItem(id:string): Observable<APIResponse<Items>>{
    return this.http.delete<APIResponse<Items>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new Items())));
  }

}

