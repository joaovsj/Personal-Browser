import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

// Services
import { CommunicationService } from '@services/communication.service';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})
export class ShoppingComponent implements OnChanges, OnInit{

  
  @Input() data: any;
  public items: any = [];

  constructor(
    private http: HttpClient,
    private cummunicationService: CommunicationService,
  ){}

  ngOnInit() {
    this.http.get('assets/mocks/shopping.json').subscribe({
      next: (res: any) => {

        console.log(res);

        if(res){
          this.items = res.shopping_results;
        }

      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  ngOnChanges(){
    console.log(this.data);
  }
}
