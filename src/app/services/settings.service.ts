import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private readonly apiKey = "app_settings";

  private settings = {
    serpApiKey: ""
  }

  constructor() { 
    this.loadSettings();
  }

  public setApiKey(key: string){
    this.settings.serpApiKey = key;
  }

  private loadSettings(){
    const settings = localStorage.getItem(this.apiKey);
    console.log(settings);

    if (settings){
      this.settings = JSON.parse(settings);
    }
  }
}
