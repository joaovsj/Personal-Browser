import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


// Services
import { CommunicationService } from '@services/communication.service';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})
export class ShoppingComponent implements OnChanges, OnInit{

  
  @Input() data: any;
  public allItems: any[] = [];
  public items: any[] = [];
  public form!: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private communicationService: CommunicationService
  ) {

    this.form = this.fb.group({
      minPrice: [0],
      maxPrice: [1000],
      minRating: [0],
      source: [''],
      freeDelivery: [false],
      discounted: [false]
    });
  }

  ngOnInit() {


    this.http.get('assets/mocks/shopping.json').subscribe({
      next: (res: any) => {

        console.log(res);

        if (res) {
          this.allItems = res.shopping_results;
          this.items = [...this.allItems];
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

  applyFilters() {
  const filters = this.form.value;

  this.items = this.allItems.filter(item => {
      const priceOk =
        item.extracted_price >= filters.minPrice &&
        item.extracted_price <= filters.maxPrice;
      const ratingOk =
        !filters.minRating || item.rating >= filters.minRating;
      const sourceOk =
        !filters.source || item.source === filters.source;
      const deliveryOk =
        !filters.freeDelivery || (item.delivery && item.delivery.toLowerCase().includes('free'));
      const discountOk =
        !filters.discounted || !!item.tag;

      return priceOk && ratingOk && sourceOk && deliveryOk && discountOk;
    });
}

   resetFilters() {
    this.form.reset({
      minPrice: 0,
      maxPrice: 1000,
      minRating: 0,
      source: '',
      freeDelivery: false,
      discounted: false
    });
    this.items = [...this.allItems];
  }
}
