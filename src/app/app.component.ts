import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNavComponent } from './header/top-nav/top-nav.component';
import { SubTopNavComponent } from './header/sub-top-nav/sub-top-nav.component';
import { FooterComponent } from './footer/footer/footer.component';
import { BaseComponent } from './base-component/base.component';
import { Store } from '@ngrx/store';
import { IAppState } from './store/reducers/app.state';
import { generalActions } from './store/actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopNavComponent, SubTopNavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends BaseComponent {
  constructor(private store: Store<IAppState>){
    super()
  }

  public ngOnInit(): void {
    this.store.dispatch(generalActions.getCategories());
    this.store.dispatch(generalActions.getModules());
  }

  public override ngOnDestroy(): void {
      super.ngOnDestroy()
  }
}
