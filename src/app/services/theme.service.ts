import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themeChange  = new Subject<string>();
  colorChange  = new Subject<string>();

  constructor() { }

  setTheme(theme: string){
    document.body.setAttribute('data-theme', theme);
    this.themeChange.next(theme);
  }
  
  setColor(color: string){
    document.body.setAttribute('data-color', color);
    this.colorChange.next(color);
  }


}
