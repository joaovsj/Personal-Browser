import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Services
import { SettingsService }  from '@services/settings.service';
import { ConfirmService }   from '@services/confirm.service';
import { CommunicationService } from '@services/communication.service';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{

  #settingService       = inject(SettingsService);
  #confirmService       = inject(ConfirmService);
  #cummunicationService = inject(CommunicationService);
  #fb                   = inject(FormBuilder);

  @Output() componentChange = new EventEmitter<{badge: string, data: any}>();
  @Output() spinner         = new EventEmitter<boolean>(false);

  public searchForm: FormGroup;

  badges = [
    // { label: 'IA Insights',   value: 'ai',        icon: 'bi bi-stars' },
    { label: 'Images',        value: 'images',    icon: 'bi bi-images' },
    { label: 'Shopping',      value: 'shopping',  icon: 'bi bi-shop' },
    { label: 'News',          value: 'news',      icon: 'bi bi-newspaper' },
    { label: 'Jobs',          value: 'jobs',      icon: 'bi bi-folder2-open' },
  ];

  badgeSelected = "";

  constructor(){
    this.searchForm = this.#fb.group({
      query:    ["", Validators.required],
    });
  }

  ngOnInit(){
    
    this.#cummunicationService.data$.subscribe(data => {
      if (data){
        this.makeRequest(data);
      }
    })
  }

  setCategory(category: string){

    if (this.badgeSelected == category){
      this.badgeSelected = "";
    }else{
      this.badgeSelected = category;
    }
    
  }

  requestForm(){      
    if(this.searchForm.invalid) return;

    const query = this.searchForm.value.query 
    this.spinner.emit(true);
    this.request(query);
  }

  makeRequest(data: any){
    const query = this.getQueryValue(data, "q");
    const start = Number(this.getQueryValue(data, "start")) || 0;

    this.searchForm.patchValue({
      query: query
    });

    this.spinner.emit(true);
    this.request(query, start);
  }

  private getQueryValue(urlString: string, param: string): string | null {
    const url = new URL(urlString);
    return url.searchParams.get(param);
  }


  request(query: any, start = 0){
    this.badgeSelected = this.badgeSelected == "" ? "google" : this.badgeSelected;
    
    this.#settingService.searchGoogle(query,this.badgeSelected, start).subscribe({
      next: (res) => {

        this.spinner.emit(true);
        this.componentChange.emit({
          badge: this.badgeSelected,
          data: res 
        })

      },
      error: (err) => {

        if(err.status == 401){
          this.#confirmService.show("Please provide your correct SerpApi key in settings.", "info");
        }

        console.log(err);
      },
      complete: () => {
        this.spinner.emit(false);
      },
    })
  }  
}
