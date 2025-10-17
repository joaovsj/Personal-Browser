import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

// Services
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public darkMode = false;  
  @Output() toggleModal = new EventEmitter();

  constructor(private themeService: ThemeService){
    
  }

  public changeTheme(){
    this.darkMode = !this.darkMode;

    let theme = this.darkMode ? "dark" : "light";
    this.themeService.setTheme(theme);
  }

  public showModal(){
    this.toggleModal.emit();
  }
}
