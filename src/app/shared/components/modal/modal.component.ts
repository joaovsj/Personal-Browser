import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
// Services
import { ThemeService }     from '../../../services/theme.service';
import { SettingsService }  from '@services/settings.service';
import { ConfirmService }   from '@services/confirm.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  #themeService   = inject(ThemeService);
  #settingService = inject(SettingsService);
  #confirmService = inject(ConfirmService);
  #fb             = inject(FormBuilder);
  public apiform: FormGroup;
  
  constructor() {
    this.apiform = this.#fb.group({
      apikey: ["", Validators.required]
    });
  }

  @Output() closeModal = new EventEmitter();

  public close(){
    this.closeModal.emit();
  }

  public setColor(color: string){
    this.#themeService.setColor(color);
  }

  public submit(){
    const key = this.apiform.value.apikey;
    this.#settingService.setApiKey(key)
    this.#confirmService.show("Api key set successfully");
  }
}

