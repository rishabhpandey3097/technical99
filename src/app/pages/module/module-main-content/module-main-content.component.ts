import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@app/base-component/base.component';
import { LanguageComponent } from '@app/pages/language/language.component';
import { LayoutComponentStore } from '@app/pages/layout/layout.component.store';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-module-main-content',
  templateUrl: './module-main-content.component.html',
  styleUrl: './module-main-content.component.scss'
})
export class ModuleMainContentComponent extends BaseComponent {
  public topicContent$: Observable<any> = this.layoutComponentStore.topicContent$;
  constructor(private route: ActivatedRoute, private layoutComponentStore: LayoutComponentStore) {
    super()
  }

  public ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res?.['topic']) {
        this.layoutComponentStore.getTopicContent(res?.['topic'])
      }
    })
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
