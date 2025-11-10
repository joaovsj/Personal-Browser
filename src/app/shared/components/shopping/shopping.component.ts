import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Pipes
import { ShortnumberPipe } from '@pipes/shortnumber.pipe';

// Services
import { CommunicationService } from '@services/communication.service';
import { ConfirmService }       from '@services/confirm.service';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ShortnumberPipe],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})
export class ShoppingComponent implements OnChanges, OnInit{

  
  @Input() data: any;
  public allItems: any[] = [];
  public items: any[] = [];
  public form!: FormGroup;
  public sources: any = [];
  public isExpanded: boolean = false;
  public windowWidth: number = 0;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private communicationService: CommunicationService,
    private confirmService: ConfirmService
  ) {

    this.form = this.fb.group({
      minPrice: [0, [Validators.min(0)]],
      maxPrice: [1000, [Validators.min(0)]],
      minRating: [0, [Validators.min(0), Validators.max(5)]],
      source: [''],
      freeDelivery: [false],
      discounted: [false]
    }, {
      validators: [this.priceRangeValidator]
    });

    this.windowWidth = window.innerWidth;
  }

  priceRangeValidator(form: AbstractControl) {
    const min = form.get('minPrice')?.value;
    const max = form.get('maxPrice')?.value;

    if (min !== null && max !== null && Number(min) > Number(max)) {
      return { priceRangeInvalid: true };
    }
    return null;
  }

  ngOnInit() {

     window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  }

  ngOnChanges(){

    if (this.data) {
      this.allItems = this.data.shopping_results;
      this.items = [...this.allItems];

      this.sources = Array.from(new Set(this.allItems.map(item => item.source)));
    }

  }

  applyFilters() {


    if (this.form.invalid) {
      if (this.form.hasError('priceRangeInvalid')) {
        this.confirmService.show('O preço mínimo não pode ser maior que o máximo.');
      } else {
        this.confirmService.show('Verifique os campos de filtro.', 'error');
      }
      return;
    }

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

  public expand(){
    this.isExpanded = !this.isExpanded;
  }
}
