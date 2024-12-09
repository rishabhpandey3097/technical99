import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseComponent } from '@app/base-component/base.component';
import { IAppState } from '@app/store/reducers/app.state';
import { selectIsUserLoggedIn, selectSigninModalState } from '@app/store/selectors';
import { Store, select } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, distinctUntilChanged, takeUntil } from 'rxjs';
import { isEqual } from 'lodash-es';
import { generalActions } from '@app/store/actions';

@Component({
  selector: 'app-signin-modal',
  standalone: true,
  imports: [CommonModule, ButtonModule, DialogModule, InputTextModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signin-modal.component.html',
  styleUrl: './signin-modal.component.scss'
})
export class SigninModalComponent extends BaseComponent implements OnInit {
  public openState$: Observable<boolean>;
  public isLoggedIn$: Observable<boolean>;
  public visible: boolean = false;
  public signinForm: FormGroup;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private store: Store<IAppState>) {
    super()

    this.openState$ = this.store.pipe(
      select(selectSigninModalState),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
    this.isLoggedIn$ = this.store.pipe(
      select(selectIsUserLoggedIn),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )

    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    })
  }

  public ngOnInit(): void {
    this.openState$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.showDialog(res);
    });

    this.isLoggedIn$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        this.onHideModal();
      }
    })
  }

  private showDialog(state: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      this.visible = state;
    }
  }

  public onHideModal(event?): void {
    this.store.dispatch(generalActions.toggleSigninModalState({ open: false }))
  }

  public openSignupModal(): void {
    this.store.dispatch(generalActions.toggleSigninModalState({ open: false }));
    this.store.dispatch(generalActions.togglePreSignupModalState({ open: true }));
  }

  public onLogin(): void {
    const payload = new FormData();
    payload.append('username', this.signinForm?.value?.email);
    payload.append('password', this.signinForm?.value?.password);
    payload.append('grant_type', 'password');
    this.store.dispatch(generalActions.signinAction({ payload }))

  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
