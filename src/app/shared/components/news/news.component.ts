import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

// Services
import { CommunicationService } from '@services/communication.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
    @Input() data: any;
    
    public images: any = [];
    public news_results: any = [];
    public next: string = "";
    public previous: string = "";
    
    constructor(
      private http: HttpClient,
      private communicationService: CommunicationService
    ) {}
  
  
    ngOnInit(){

      // console.log("it's here");

      // this.http.get('assets/mocks/news.json').subscribe({
      //   next: (res: any) => {
  
      //     console.log(res);


      //     if(res){
      //       this.news_results = res.news_results;
      //       this.next         = res.serpapi_pagination.next;
      //       console.log(this.next);
      //     }

      //   },
      //   error: (err: any) =>{
      //     console.log(err);
      //   }
      // });
    }
  
    ngOnChanges(){
      if(this.data){
          this.news_results = this.data.news_results;
          this.next         = this.data.serpapi_pagination.next;
          this.previous     = this.data.serpapi_pagination.previous || ""; 
            console.log(this.next);
      }
    }

    goToPage(link: string){
      this.data   = "";
      this.news_results  = "";


      this.communicationService.sendData(link);

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  }
  
}
