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
  public gif: string = "assets/gifs/white_rocket.gif";

  constructor (private themeService: ThemeService){

    this.themeService.themeChange.subscribe(theme => {
      if (theme == "dark"){
        this.gif = "assets/gifs/dark_rocket.gif";
      } else{
        this.gif = "assets/gifs/white_rocket.gif";
      }
    });
  }

  public toggleModal(){
    this.showModal = !this.showModal;
  }
}
