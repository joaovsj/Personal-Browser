import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

// Sevices
import { ConfirmService } from '@services/confirm.service';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  
  public message: string = "Api key set sucessfully!";
  public status = inject(ConfirmService);

  public closePopUp(){
    this.status.close();
  }

}
