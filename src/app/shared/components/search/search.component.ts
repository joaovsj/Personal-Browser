import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
    
  badges = [
    { label: 'IA Insights',   value: 'ai',        icon: 'bi bi-stars' },
    { label: 'Images',        value: 'images',    icon: 'bi bi-images' },
    { label: 'Shopping',      value: 'shopping',  icon: 'bi bi-shop' },
    { label: 'News',          value: 'news',      icon: 'bi bi-newspaper' },
    { label: 'Jobs',          value: 'jobs',      icon: 'bi bi-folder2-open' },
  ];

  badgeSelected = "";

  setCategory(category: string){

    if (this.badgeSelected == category){
      this.badgeSelected = "";
    }else{
      this.badgeSelected = category;
    }
    
  }
}
