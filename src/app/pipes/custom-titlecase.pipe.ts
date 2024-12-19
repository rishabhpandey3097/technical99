import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTitlecase',
  standalone: true
})
export class CustomTitlecasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Remove hyphens and convert to Title Case
    return value
      .split('-') // Split by hyphens
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join back with spaces
  }

}
