import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [],
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent implements OnInit{

  @Input() data: any;
  
  
  public clientTop = 100
  public clientLeft = 100

  constructor(
    private http: HttpClient,
  ) {}

  showValues(event: MouseEvent){

    this.clientTop = event.clientY - 1000;
    this.clientLeft = event.clientX - 1000;


    console.log(event.clientX, event.clientY);

  }

  ngOnInit(){
    this.http.get('assets/mocks/images.json').subscribe({
      next: (res: any) => {

        console.log(res);


        this.data = res.images_results;
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

}
