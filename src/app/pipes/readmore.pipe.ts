import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readmore',
  standalone: true
})
export class ReadmorePipe implements PipeTransform {

  transform(value: string, limit: number = 10): string {
    
    if(!value) return "";

    const words = value.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : value;;
  }

}
