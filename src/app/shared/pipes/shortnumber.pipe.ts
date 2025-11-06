import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortnumber',
  standalone: true
})
export class ShortnumberPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined) return '';

    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    }

    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    }

    if (value >= 1_000) {
      return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    }

    return value.toString();
  }

}
