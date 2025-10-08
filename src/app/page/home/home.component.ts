import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// Components
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SearchComponent } from '../../components/search/search.component';
import { ThemeService } from '../../services/theme.service';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, SearchComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  public showModal: boolean = false;
  public gif: string = "";


  public themeDefined: string = "";
  public color: string = "";


  constructor(private themeService: ThemeService) {
    this.themeDefined = localStorage.getItem("theme") || "light";
    this.color        = localStorage.getItem("color") || "blue";

    this.gif = `assets/gifs/${this.color}_${this.themeDefined}.gif`;

    this.themeService.setTheme(this.themeDefined);
    this.themeService.setColor(this.color);

    this.themeService.themeChange.subscribe(theme => {
      this.themeDefined = theme
      localStorage.setItem("theme", theme);

      this.gif = `assets/gifs/${this.color}_${theme}.gif`;
    });


    this.themeService.colorChange.subscribe(color => {
      this.color = color;
      localStorage.setItem("color", color)

      this.gif = `assets/gifs/${color}_${this.themeDefined}.gif`;
    });
  }


  public toggleModal() {
    this.showModal = !this.showModal;
  }
}
