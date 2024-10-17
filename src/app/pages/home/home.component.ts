import { Component, OnInit, inject } from '@angular/core';
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
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../store/reducers/app.state';
import { Observable, distinctUntilChanged, take, takeUntil } from 'rxjs';
import { BaseComponent } from '../../base-component/base.component';
import { selectCategories, selectInterview, selectModules } from '../../store/selectors';
import { isEqual } from 'lodash-es';
import { generalActions } from '../../store/actions';
import { HomeService } from '@app/services/home.service';
import { HomeComponentStore } from './home.component.store';
import { MenuItem } from 'primeng/api';
import { PRODUCT_SOLUTIONS, STATIC_CARD_CONTENT } from '@app/constants/solutions.constant';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    TabViewModule,
    GalleriaModule,
    TagModule,
    RatingModule
  ],
  providers: [PhotoService, ProductService, HomeComponentStore],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends BaseComponent implements OnInit {
  images: any[] | undefined;
  products: Product[] | undefined;
  responsiveOptions: any[] | undefined;
  value!: number;
  public solutions = PRODUCT_SOLUTIONS;
  public staticCardContent = STATIC_CARD_CONTENT;

  // Observables
  public tabContent$: Observable<any> = this.componentStore.moduleTabContent$;
  public categories$: Observable<Array<any>>;
  public modules$: Observable<Array<any>>;
  public interviewSection$: Observable<Array<any>>

  constructor(
    private photoService: PhotoService,
    private productService: ProductService,
    private componentStore: HomeComponentStore,
    private store: Store<IAppState>
  ) {
    super()
    this.categories$ = this.store.pipe(
      select(selectCategories),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
    this.modules$ = this.store.pipe(
      select(selectModules),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
    this.interviewSection$ = this.store.pipe(
      select(selectInterview),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
  }

  ngOnInit() {
    this.images = this.photoService.getImages();
    this.products = this.productService.getProductsSmall();
    this.componentStore.getTabContent({id: 1})
    
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 4,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
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

  public getModuleInfo(event): void {
    this.componentStore.getTabContent({id: event?.index+1})
  }

  public override ngOnDestroy(): void {
      super.ngOnDestroy()
  }
}
