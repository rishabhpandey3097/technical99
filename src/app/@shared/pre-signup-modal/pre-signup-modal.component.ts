import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BaseComponent } from '@app/base-component/base.component';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { IAppState } from '@app/store/reducers/app.state';
import { generalActions } from '@app/store/actions';
import { Observable, distinctUntilChanged, takeUntil } from 'rxjs';
import { isEqual } from 'lodash-es';
import { selectPreSignupModalState, selectPreSignupSecretCode } from '@app/store/selectors';

@Component({
  selector: 'app-pre-signup-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pre-signup-modal.component.html',
  styleUrl: './pre-signup-modal.component.scss'
})
export class PreSignUpModalComponent extends BaseComponent implements OnInit {
  public openState$: Observable<boolean>;
  public visible: boolean = false;
  public activeTab: 'mobile' | 'email' = 'email';
  public emailControl: FormControl<string> = new FormControl<string>('', [Validators.required, Validators.email]);
  public secretCode$: Observable<any>;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private store: Store<IAppState>) {
    super()
    this.openState$ = this.store.pipe(
      select(selectPreSignupModalState),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    );
    this.secretCode$ = this.store.pipe(
      select(selectPreSignupSecretCode),
      takeUntil(this.destroy$)
    )
  }

  public ngOnInit(): void {
    this.openState$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.showDialog(res);
    })

    this.secretCode$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        console.log("secretCode ==>", res);
        this.onHideModal();
        this.store.dispatch(generalActions.toggleSignupModalState({ open: true }));
      }
    })
  }

  public showDialog(state: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      this.visible = state;
    }
  }

  public onHideModal(): void {
    this.store.dispatch(generalActions.togglePreSignupModalState({ open: false }));
  }

  public continue(): void {
    const email = this.emailControl?.value;
    this.store.dispatch(generalActions.preSignupAction({ email }))
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
