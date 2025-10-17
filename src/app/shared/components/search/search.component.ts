import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Services
import { SettingsService } from '@services/settings.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  
  #fb = inject(FormBuilder);
  #settingService = inject(SettingsService);

  public searchForm: FormGroup;

  badges = [
    { label: 'IA Insights',   value: 'ai',        icon: 'bi bi-stars' },
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

  setCategory(category: string){

    if (this.badgeSelected == category){
      this.badgeSelected = "";
    }else{
      this.badgeSelected = category;
    }
    
  }

  request(){
    if(this.searchForm.invalid) return;
    
    // if no badge selected, default to "google"
    this.badgeSelected = this.badgeSelected == "" ? "google" : this.badgeSelected;

    const query = this.searchForm.value.query 
    
    this.#settingService.searchGoogle(query,this.badgeSelected).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("request finished");
      },
    })
    

  }
}
