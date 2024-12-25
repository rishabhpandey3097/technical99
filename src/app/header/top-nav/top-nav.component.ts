import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BaseComponent } from '@app/base-component/base.component';
import { generalActions } from '@app/store/actions';
import { IAppState } from '@app/store/reducers/app.state';
import { Store, select } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { SwitchTechnologyComponent } from '@app/@shared/switch-technology/switch-technology.component';
import { Observable, distinctUntilChanged, take, takeUntil } from 'rxjs';
import { isEqual } from 'lodash-es';
import { selectCategories, selectIsHomePage, selectedLanguage } from '@app/store/selectors';
import { CardModule } from 'primeng/card';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule, OverlayPanelModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ChipsModule, SwitchTechnologyComponent, CardModule, PanelMenuModule, SidebarModule],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss',
})
export class TopNavComponent extends BaseComponent {
  public navActions = [
    { name: 'Home', icon: 'pi pi-home', route: '/' },
    { name: 'Training', icon: 'pi pi-graduation-cap' },
    { name: 'Assessment', icon: 'pi pi-book' },
    { name: 'Community', icon: 'pi pi-globe' },
    { name: 'Login', icon: 'pi pi-user' },
  ];

  public selectedIndex: number = 0;
  public menus;
  public currentMenu;
  public categories$: Observable<any>;
  public selectedLanguage$: Observable<string>;
  public isHomePage$: Observable<boolean>;

  public showOverlay: boolean = false;
  public categorySideMenu: boolean = false;
  public categoryPanelMenu: any;

  constructor(private router: Router, private store: Store<IAppState>, private route: ActivatedRoute) {
    super()
    this.categories$ = this.store.pipe(
      select(selectCategories),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
    this.selectedLanguage$ = this.store.pipe(
      select(selectedLanguage),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
    this.isHomePage$ = this.store.pipe(
      select(selectIsHomePage),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
  }

  public ngOnInit(): void {
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        this.menus = res?.map(item => {
          return {
            name: item?.name,
            menuItems: item?.languages
          }
        })
        this.currentMenu = this.menus?.[0];

        this.categoryPanelMenu = this.menus?.map(item => {
          return {
            label: item?.name,
            items: item?.menuItems?.map(menuItem => {
              return {
                label: menuItem?.name,
                command: () => {
                  let route = menuItem?.name?.toLowerCase()?.replace(' ', '-')
                  this.store.dispatch(generalActions.setSelectedLanguage({ language: route }));
                  this.categorySideMenu = false;
                  return this.router.navigateByUrl(`/${route}`)
                }
              }
            })
          }
        })
      }
    })

    this.isHomePage$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        this.showOverlay = false;
      }
    })
  }

  public openLoginModal(): void {
    this.store.dispatch(generalActions.toggleSigninModalState({ open: true }))
  }

  public changeMenuItems(index) {
    this.selectedIndex = index;
    this.currentMenu = this.menus[index];
  }

  public goToSelectedRoute(route: string): void {
    if (!route) return;
    this.store.dispatch(generalActions.setSelectedLanguage({ language: route }));
    setTimeout(() => {
      this.showOverlay = false;
      this.router.navigateByUrl(`/${route}`)
    }, 100);
  }

  public onNavSelect(nav: string, route: string): void {
    switch (nav) {
      case 'Home':
        this.router.navigateByUrl(route)
        break;
      case 'Login':
        this.store.dispatch(generalActions.toggleSigninModalState({ open: true }))
        break;

      default:
        break;
    }
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
