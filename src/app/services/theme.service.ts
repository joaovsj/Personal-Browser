import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themeChange  = new Subject<String>();

  constructor() { }

  setTheme(theme: string){
    document.body.setAttribute('data-theme', theme);
    this.themeChange.next(theme);
  }
  
  setColor(color: string){
    document.body.setAttribute('data-color', color);
  }


}
