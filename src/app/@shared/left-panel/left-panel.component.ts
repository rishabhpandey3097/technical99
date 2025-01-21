import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { BaseComponent } from '@app/base-component/base.component';
import { CustomTitlecasePipe } from '@app/pipes/custom-titlecase.pipe';
import { generalActions } from '@app/store/actions';
import { IAppState } from '@app/store/reducers/app.state';
import { selectChangePageNumber } from '@app/store/selectors';
import { Store, select } from '@ngrx/store';
import { Observable, distinctUntilChanged, takeUntil } from 'rxjs';
import { SidebarModule } from 'primeng/sidebar';
import { isEqual } from 'lodash-es';
import { SsrCookieService } from 'ngx-cookie-service-ssr';


@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule, CustomTitlecasePipe, SidebarModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss'
})
export class LeftPanelComponent extends BaseComponent {
  @Input() sideBarContent: any;
  @Input() selectedLanguage: any;
  @Input() selectedTopicContent: any;
  @Input() subTopics: any;

  @Output() selectedTopicEmitter = new EventEmitter();
  @Output() selectedTitleEmitter = new EventEmitter();

  public menuData = [];
  public expandAll: boolean = false;
  public sidebarVisible: boolean = false;

  private changeNumber$: Observable<number>;
  private selectedTopicId: any;
  private selectedSubTopicId: any;

  public activeTitle: string;

  private cookieService = inject(SsrCookieService);
  private cdr = inject(ChangeDetectorRef);
  constructor(private store: Store<IAppState>) {
    super()
    this.changeNumber$ = this.store.pipe(
      select(selectChangePageNumber),
      distinctUntilChanged(isEqual),
      takeUntil(this.destroy$)
    )
  }

  public ngOnInit(): void {
    this.changeNumber$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (res && res >= 0) {
        const topic = this.subTopics.at(res);
        this.openContent(topic?.shortTitle, res, false);
      }
    })
  }

  public ngAfterViewInit(): void {
    const cookies = this.cookieService.getAll();
    if(cookies?.['topic']) {
      console.log(JSON.parse(cookies['topic']))
      this.toggleExpand(JSON.parse(cookies['topic']), false)
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log("changes ==>", changes);
    if ("sideBarContent" in changes) {
      this.menuData = this.sideBarContent?.techs?.map(item => {
        return {
          ...item,
          expanded: false
        }
      })
    }

    if ('subTopics' in changes && changes['subTopics']?.currentValue?.length) {
      const subTopics = changes['subTopics']?.currentValue;
      const topic = this.menuData?.find(item => +item?.id == +this.selectedTopicId);
      let subTopic = topic?.topics?.find(sub => +sub?.id === this.selectedSubTopicId);
      const subTopicIndex = topic?.topics?.findIndex(s => +s?.id === this.selectedSubTopicId)
      subTopic = {
        ...subTopic,
        topics: subTopics,
        expanded: true,
      };
      topic?.topics?.splice(subTopicIndex, 1, subTopic);
    }
  }

  public toggleExpand(menuItem: any, setCookie: boolean): void {
    if(setCookie) {
      this.cookieService.set('topic', JSON.stringify(menuItem))
    }
    this.selectedTopicId = menuItem?.id;
    if (menuItem.topics) {
      menuItem.expanded = !menuItem.expanded;
    }

    console.log("menuData ==>", this.menuData);
  }

  public toggleExpandChild(child, setCookie = true): void {
    if(setCookie) {
      this.cookieService.set('subTopic', JSON.stringify(child))
    }
    this.selectedSubTopicId = child?.id;

    if (!child?.expanded && !child?.topics?.length) {
      this.selectedTopicEmitter.emit({
        subTopic: child?.name
      })
    }

    const topic = this.menuData?.find(item => +item?.id == +this.selectedTopicId);
    let subTopic = topic?.topics?.find(sub => +sub?.id === this.selectedSubTopicId);
    const subTopicIndex = topic?.topics?.findIndex(s => +s?.id === this.selectedSubTopicId)
    subTopic = {
      ...subTopic,
      expanded: !child?.expanded,
    };
    topic?.topics?.splice(subTopicIndex, 1, subTopic);
  }

  public expandAllMenuItems(): void {
    this.expandAll = !this.expandAll;

    this.menuData = this.menuData.map(item => ({
      ...item,
      expanded: this.expandAll
    }))
  }

  public openContent(title, index, setCookie = true, titleId?): void {
    // console.log("title ==>", title);
    // console.log("index ==>", index);
    if(setCookie) {
      this.cookieService.set('title', JSON.stringify({title, index}))
    }
    this.store.dispatch(generalActions.setCurrentPage({
      currentPage: index
    }))
    this.selectedTitleEmitter.emit(title);
    this.activeTitle = title;
    this.sidebarVisible = false;
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
