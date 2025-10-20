import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  public active$  : BehaviorSubject<boolean>  = new BehaviorSubject(false);
  public message$ : BehaviorSubject<string>   = new BehaviorSubject("");
  public class$   : BehaviorSubject<string>  = new BehaviorSubject("");
  public icon$    : BehaviorSubject<string>  = new BehaviorSubject("");

  private duration = 6000;

  public icons = [
    {class: "success", icon: "bi bi-check-circle-fill"},
    {class: "error",   icon: "bi bi-exclamation-circle-fill"},
    {class: "info",    icon: "bi bi-exclamation-diamond-fill"}
  ];

  constructor() { }

  public show(message: string, type: string = 'success'){

    const icon = this.getIcon(type) ?? "";
    
    this.active$.next(false);

    
    setTimeout(() => {
      this.message$.next(message);
      this.class$.next(type);
      this.icon$.next(icon);
      this.active$.next(true);

      
      setTimeout(() => this.close(), this.duration);
    }, 10); // delay 10ms
  }

  public getIcon(type: string){
    return this.icons.find(i => i.class == type)?.icon;
  }

  public close(){
    this.active$.next(false);
  }

}
