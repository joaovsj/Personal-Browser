import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

// Pipes
import { ReadmorePipe } from '../../pipes/readmore.pipe';

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule, ReadmorePipe],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent {
  
  public fullText: boolean = false;

  public text = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo omnis reprehenderit repellat aliquam, rem quasi nulla, dicta laborum officia libero ea fuga aut modi velit fugiat minus natus enim! Tenetur cum placeat consequatur doloribus quisquam, magni ipsum natus temporibus, dolores vel id voluptatibus laudantium? Sed nihil dignissimos delectus doloremque, veniam, aut nobis possimus quo corporis beatae natus atque quidem eius, quis ullam! Voluptatibus beatae libero veniam provident itaque aut voluptate impedit assumenda. Obcaecati nam earum, voluptatum esse consectetur quibusdam enim placeat dolore, beatae asperiores quos itaque sint dolor tempore nesciunt, voluptatibus illo eaque neque aliquam quis porro aliquid iste qui.";


  toggleFullText(){
    this.fullText = !this.fullText;
  }
}
