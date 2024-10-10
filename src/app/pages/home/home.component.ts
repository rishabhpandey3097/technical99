import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { TabViewModule } from 'primeng/tabview';
import { PhotoService } from '../../services/photo.service';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, CardModule, CarouselModule, TabViewModule, GalleriaModule, TagModule, RatingModule],
  providers: [PhotoService, ProductService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  images: any[] | undefined;
  products: Product[] | undefined;
  responsiveOptions: any[] | undefined;
  value!: number;

  constructor(private photoService: PhotoService, private productService: ProductService) { }

  ngOnInit() {
    this.images = this.photoService.getImages();
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];

    // Blogs
    this.products = this.productService.getProductsSmall();

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  getSeverity(status: string): string {
    if (status === 'high') {
      return 'danger';
    } else if (status === 'medium') {
      return 'warning';
    } else if (status === 'low') {
      return 'success';
    } else {
      return 'info'; // Default case, or handle error as needed
    }
  }
}

