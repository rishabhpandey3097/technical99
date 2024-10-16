import { Component, inject, OnDestroy } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  private _destroy$: Subject<any>;
  public location: Location = inject(Location);
  private injectedRouter = inject(Router);

  constructor() {}

  get destroy$() {
    if (!this._destroy$) {
      this._destroy$ = new Subject();
    }
    return this._destroy$;
  }

  public ngOnDestroy(): void {
    if (this._destroy$) {
      this._destroy$.next(true);
      this._destroy$.complete();
    }
  }

  public getValueFromObservable(observable: Observable<any>): any {
    let returnValue: any;
    observable.pipe(take(1)).subscribe((value) => (returnValue = value));
    return returnValue;
  }
}
