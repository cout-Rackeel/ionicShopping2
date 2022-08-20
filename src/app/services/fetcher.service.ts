import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetcherService {
  private _editState = new BehaviorSubject<boolean>(false);
  public _editState$ = this._editState.asObservable();

  constructor() { }

  isRouted(){
    this._editState.next(true);
  }

  hasReloaded(){
    this._editState.next(false);
  }


}
