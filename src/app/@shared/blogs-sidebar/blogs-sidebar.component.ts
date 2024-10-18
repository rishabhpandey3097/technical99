import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-blogs-sidebar',
  standalone: true,
  imports: [CommonModule, DataViewModule, ButtonModule, TagModule],
  templateUrl: './blogs-sidebar.component.html',
  styleUrl: './blogs-sidebar.component.scss'
})
export class BlogsSidebarComponent {
  public products: Array<any> = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
  },
  ]
}
