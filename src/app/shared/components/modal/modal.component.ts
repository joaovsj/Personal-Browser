import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// Services
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {


  constructor(private themeService: ThemeService){}

  @Output() closeModal = new EventEmitter();


  public close(){
    this.closeModal.emit();
  }


  public setColor(color: string){
    this.themeService.setColor(color);
  }
}

