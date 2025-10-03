import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// Services
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  public darkMode = false;

  constructor(private themeService: ThemeService){
    
  }

  public changeTheme(){
    this.darkMode = !this.darkMode;

    let theme = this.darkMode ? "dark" : "light";
    this.themeService.setTheme(theme);
  }
}
