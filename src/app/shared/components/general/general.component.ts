import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';

// Services
import { CommunicationService } from '@services/communication.service';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent implements OnChanges, OnInit{
  
  public datal = {
    "current": 3,
    "next_link": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Coffee&start=10",
    "next": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Coffee&start=10",
    "other_pages": {
        "1": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Coffee&start=10",
        "2": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Coffee&start=10",
        "4": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Coffee&start=30",
        "5": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Coffee&start=40",
        "6": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Coffee&start=50",
        "7": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Coffee&start=60",
        "8": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Coffee&start=70",
        "9": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Coffee&start=80",
        "10": "https://serpapi.com/search.json?device=desktop&engine=google&google_domain=google.com&q=Coffee&start=90"
    }
  }

  @Input() data: any;

  public fullText: boolean = false;
  public organicResults: any = "";
  public relatedSearches: any = "";
  public pages: any = "";

  public firstColumn: any = "";
  public secondColumn: any = "";
  private newData: any = [];

  public text = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo omnis reprehenderit repellat aliquam, rem quasi nulla, dicta laborum officia libero ea fuga aut modi velit fugiat minus natus enim! Tenetur cum placeat consequatur doloribus quisquam, magni ipsum natus temporibus, dolores vel id voluptatibus laudantium? Sed nihil dignissimos delectus doloremque, veniam, aut nobis possimus quo corporis beatae natus atque quidem eius, quis ullam! Voluptatibus beatae libero veniam provident itaque aut voluptate impedit assumenda. Obcaecati nam earum, voluptatum esse consectetur quibusdam enim placeat dolore, beatae asperiores quos itaque sint dolor tempore nesciunt, voluptatibus illo eaque neque aliquam quis porro aliquid iste qui.";


  constructor(
    private http: HttpClient,
    private cummunicationService: CommunicationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.http.get('assets/mock-data.json').subscribe({
      next: (res: any) => {

        console.log(res);

        this.organicResults   = res.organic_results;
        this.relatedSearches  = res.related_searches;  
        this.pages            = this.fillMissIndex(res.serpapi_pagination);

        console.log(this.pages);
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }


  private fillMissIndex(obj: any) {
    const otherPages = obj.other_pages;
    const keys = Object.keys(otherPages).map(Number);
    const minIndex = Math.min(...keys);
    const maxIndex = Math.max(...keys);
    const current = obj.current;

    // 1️⃣ Remove qualquer índice menor que o primeiro índice existente
    for (let i = 1; i < minIndex; i++) {
      delete otherPages[i];
    }

    // 2️⃣ Adiciona o índice atual com valor true (caso ainda não exista)
    if (!otherPages[current]) {
      otherPages[current] = true;
    }

    // 3️⃣ Retorna os pares {key, value} ordenados por número
    return Object.keys(otherPages)
                .map(Number)
                .sort((a, b) => a - b)
                .map(key => ({ key, value: otherPages[key] }));
  }


  ngOnChanges(){
    console.log(this.data);

    if (this.data){
      this.organicResults   = this.data.organic_results;
      this.relatedSearches  = this.data.related_searches;  
      this.pages            = this.fillMissIndex(this.data.serpapi_pagination);
    }

  }

  toggleFullText(){
    this.fullText = !this.fullText;
  }

  request(link: string){
    this.data   = "";
    this.pages  = "";

    console.log(this.pages);
    this.cummunicationService.sendData(link);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


}
