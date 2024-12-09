import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseComponent } from '@app/base-component/base.component';
import { generalActions } from '@app/store/actions';
import { IAppState } from '@app/store/reducers/app.state';
import { Store, select } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Observable, distinctUntilChanged, takeUntil } from 'rxjs';
import { isEqual } from 'lodash-es';
import { selectPreSignupEmail, selectSignupModalState, selectSignupSuccess } from '@app/store/selectors';

@Component({
  selector: 'app-signup-modal',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule, RadioButtonModule],
  templateUrl: './signup-modal.component.html',
  styleUrl: './signup-modal.component.scss'
})
export class SignupModalComponent extends BaseComponent implements OnInit {
  private openState$: Observable<boolean>;
  public visible: boolean = false;
  public signupForm: FormGroup;
  private preSignupEmail$: Observable<string>;
  private signupSuccess$: Observable<boolean>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private store: Store<IAppState>, private fb: FormBuilder) {
    super()
    this.openState$ = this.store.pipe(
      select(selectSignupModalState),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
    this.preSignupEmail$ = this.store.pipe(
      select(selectPreSignupEmail),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
    this.signupSuccess$ = this.store.pipe(
      select(selectSignupSuccess),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )

    this.signupForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      mobile: [null, Validators.required],
      secretCode: [null, Validators.required],
      password: [null, Validators.required],
      profession: [null, Validators.required],
      isdCode: ['91', Validators.required]
    })
  }

  public ngOnInit(): void {
    this.openState$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.showDialog(res)
    })

    this.preSignupEmail$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        this.signupForm.patchValue({
          email: res
        });
        this.signupForm.get('email')?.disable();
        this.signupForm.updateValueAndValidity();
      }
    });

    this.signupSuccess$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res) {
        this.closeModal();
      }
    })
  }

  private showDialog(state: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      this.visible = state;
    }
  }

  public closeModal(): void {
    this.store.dispatch(generalActions.toggleSignupModalState({ open: false }))
  }

  public onSignup(): void {
    console.log("formValue ==>", this.signupForm.getRawValue());
    this.store.dispatch(generalActions.signupAction({
      payload: this.signupForm.getRawValue()
    }))
  }

  public openPreSignupModal(): void {
    this.closeModal();
    this.store.dispatch(generalActions.togglePreSignupModalState({ open: true }));
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
