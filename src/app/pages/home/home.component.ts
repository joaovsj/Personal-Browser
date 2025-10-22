import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

// Components

import { FooterComponent }  from '@components/footer/footer.component';
import { SearchComponent }  from '@components/search/search.component';
import { ModalComponent }   from '@components/modal/modal.component';
import { HeaderComponent }  from '@components/header/header.component';
import { ConfirmComponent } from '@components/confirm/confirm.component';
import { GeneralComponent } from '@components/general/general.component';

// Services
import { ThemeService } from '@services/theme.service';
import { ConfirmService } from '@services/confirm.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, SearchComponent, ModalComponent, ConfirmComponent, GeneralComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @Input() badge  : string = "";  
  @Input() data   : any    = "";
  
  public currentComponent: any = "";
  public showModal    : boolean = false;
  public gif          : string  = "";
  public themeDefined : string  = "";
  public color        : string  = "";
  

  constructor(
    private themeService: ThemeService,
    private confirmService: ConfirmService
  ) {
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
  
async loadComponent({ badge, data }: { badge: string; data: any }) {
    this.data = data;

    switch (badge) {
      case 'images':
        // const { ImagesComponent } = await import('@components/images/images.component');
        // this.currentComponent = ImagesComponent;
        break;

      case 'news':
        // const { NewsComponent } = await import('@components/news/news.component');
        // this.currentComponent = NewsComponent;
        break;

      default:
        const { GeneralComponent } = await import('@components/general/general.component');
        this.currentComponent = GeneralComponent;
        break;
    }
  }


  

  
}
