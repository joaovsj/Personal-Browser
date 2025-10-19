import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  public active$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public message$: BehaviorSubject<string> = new BehaviorSubject("");

  constructor() { }


  public show(message: string){
    this.active$.next(true);
    this.message$.next(message);
  }

  public close(){
    this.active$.next(false);
  }

}
