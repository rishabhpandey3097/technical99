import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { TopNavComponent } from './header/top-nav/top-nav.component';
import { SubTopNavComponent } from './header/sub-top-nav/sub-top-nav.component';
import { FooterComponent } from './footer/footer/footer.component';
import { BaseComponent } from './base-component/base.component';
import { Store } from '@ngrx/store';
import { IAppState } from './store/reducers/app.state';
import { generalActions } from './store/actions';
import { takeUntil } from 'rxjs';
import { PreSignUpModalComponent } from './@shared/pre-signup-modal/pre-signup-modal.component';
import { SignupModalComponent } from './@shared/signup-modal/signup-modal.component';
import { SigninModalComponent } from './@shared/signin-modal/signin-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopNavComponent, SubTopNavComponent, FooterComponent, PreSignUpModalComponent, SignupModalComponent, SigninModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends BaseComponent {
  constructor(private store: Store<IAppState>, private router: Router) {
    super()

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url || '';
        this.store.dispatch(generalActions.isHomePage({ isHomePage: currentRoute === '/' ? true : false }))
      }
    });
  }

  public ngOnInit(): void {
    this.store.dispatch(generalActions.getCategories());
    this.store.dispatch(generalActions.getModules());
    this.store.dispatch(generalActions.getInterviewQuestions({ moduleId: 3 }))
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
