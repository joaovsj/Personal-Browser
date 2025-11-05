import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent implements OnInit, OnChanges{

  @Input() data: any;
  
  public images: any = [];

  public clientTop = 100
  public clientLeft = 100

  constructor(
    private http: HttpClient,
  ) {}


  ngOnInit(){
    // this.http.get('assets/mocks/images.json').subscribe({
    //   next: (res: any) => {

    //     console.log(res);


    //     this.data = res.images_results;
    //   },
    //   error: (err) =>{
    //     console.log(err);
    //   }
    // });
  }

  ngOnChanges(){
    if(this.data){
      this.images = this.data.images_results;
    }
  }

}
