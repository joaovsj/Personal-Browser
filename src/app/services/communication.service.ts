import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private dataSource = new BehaviorSubject<any>("");
  data$ = this.dataSource.asObservable();
  
  constructor() { }

  sendData(data: any){
    this.dataSource.next(data);
  }
}
