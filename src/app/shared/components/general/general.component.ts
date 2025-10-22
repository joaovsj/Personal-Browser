import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

// Pipes
import { ReadmorePipe } from '@pipes/readmore.pipe';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent implements OnChanges, OnInit{
  


  @Input() data: any;

  public fullText: boolean = false;
  public organicResults: any = "";
  public relatedSearchs: any = "";

  public text = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo omnis reprehenderit repellat aliquam, rem quasi nulla, dicta laborum officia libero ea fuga aut modi velit fugiat minus natus enim! Tenetur cum placeat consequatur doloribus quisquam, magni ipsum natus temporibus, dolores vel id voluptatibus laudantium? Sed nihil dignissimos delectus doloremque, veniam, aut nobis possimus quo corporis beatae natus atque quidem eius, quis ullam! Voluptatibus beatae libero veniam provident itaque aut voluptate impedit assumenda. Obcaecati nam earum, voluptatum esse consectetur quibusdam enim placeat dolore, beatae asperiores quos itaque sint dolor tempore nesciunt, voluptatibus illo eaque neque aliquam quis porro aliquid iste qui.";


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/mock-data.json').subscribe({
      next: (res: any) => {
        this.organicResults = res.organic_results;
        console.log(this.organicResults);
        console.log(res);
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  ngOnChanges(){
    console.log(this.data);
  }

  toggleFullText(){
    this.fullText = !this.fullText;
  }
}
