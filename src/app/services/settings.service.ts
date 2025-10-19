import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  #http = inject(HttpClient)
  #apiKey: string = "";

  public readonly baseUrl = "/serpapi/search.json";
  public params: HttpParams = new HttpParams();
  
  
  constructor() { 
    this.#apiKey = localStorage.getItem("serpApiKey") || "";
  }

  public getApiKey(){
    return this.#apiKey;
  }

  public setApiKey(key: string){
    this.#apiKey = key;
    localStorage.setItem("serpApiKey", key);
  }

  public searchGoogle(query: string, engine: string){
    this.params = new HttpParams()
      .set("q", query)
      .set("engine", engine)
      .set("api_key", this.getApiKey());

    return this.#http.get(this.baseUrl, {params: this.params});
  }
}
