import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BaseComponent } from '@app/base-component/base.component';
import { generalActions } from '@app/store/actions';
import { IAppState } from '@app/store/reducers/app.state';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
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

  constructor(private router: Router, private store: Store<IAppState>) {
    super()
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
