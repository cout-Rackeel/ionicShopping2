import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIResponse } from './models/api-response';
import { Categories } from './models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API_URL = "http://localhost:3000/api/v1/categories";

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

  getAllCategories(): Observable<APIResponse<Categories[]>>{
    return this.http.get<APIResponse<Categories[]>>(this.API_URL).pipe(catchError(this._handleHttpErrors([])))
  }

  getCategoryById(id:string): Observable<APIResponse<Categories>>{
    return this.http.get<APIResponse<Categories>>(this.API_URL + '/'+ id).pipe(catchError(this._handleHttpErrors(new Categories())));
  }

  createCategory(data:Categories): Observable<APIResponse<Categories>>{
    return this.http.post<APIResponse<Categories>>(this.API_URL, data).pipe(catchError(this._handleHttpErrors(new Categories())));
  }

  updateCategory(id: string, data:Categories): Observable<APIResponse<Categories>>{
    return this.http.put<APIResponse<Categories>>(this.API_URL + '/' + id, data).pipe(catchError(this._handleHttpErrors(new Categories())));
  }

  deleteCategory(id:string): Observable<APIResponse<Categories>>{
    return this.http.delete<APIResponse<Categories>>(this.API_URL + '/' + id).pipe(catchError(this._handleHttpErrors(new Categories())));
  }
}
