import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@app/base-component/base.component';
import { generalActions } from '@app/store/actions';
import { IAppState } from '@app/store/reducers/app.state';
import { Store, select } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BehaviorSubject, Observable, distinctUntilChanged, expand, takeUntil } from 'rxjs';
import { isEqual } from 'lodash-es';
import { selectChangePageNumber } from '@app/store/selectors';

@Component({
    selector: 'app-tutorial-sidebar',
    standalone: true,
    imports: [CommonModule, PanelMenuModule],
    templateUrl: './tutorial-sidebar.component.html',
    styleUrl: './tutorial-sidebar.component.scss'
})
export class TutorialSidebarComponent extends BaseComponent implements OnInit {
    @Input() sideBarContent: Array<any>;
    @Input() subTopics: Array<any>;
    @Input() selectedLanguage: string;
    @Input() selectedTopicContent: any;
    @Output() selectedTopicEmitter = new EventEmitter<any>();
    @Output() selectedTitleEmitter = new EventEmitter<string>();

    public selectedTopicId: number;
    public selectedSubTopicId: number;
    public items: MenuItem[];

    public panelItems$: BehaviorSubject<Array<MenuItem>> = new BehaviorSubject<Array<MenuItem> | null>(null);

    private changeNumber$: Observable<number>;

    constructor(private cdr: ChangeDetectorRef, private store: Store<IAppState>) {
        super()

        this.changeNumber$ = this.store.pipe(
            select(selectChangePageNumber),
            distinctUntilChanged(isEqual),
            takeUntil(this.destroy$)
        )
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('sideBarContent' in changes) {
            this.items = changes?.['sideBarContent'].currentValue?.map(content => {
                return {
                    id: content?.id,
                    label: content?.name,
                    icon: 'pi pi-plus',
                    expanded: false,
                    items: content?.topics?.map(t => {
                        return {
                            id: t?.id,
                            label: t?.name,
                            icon: 'pi pi-plus',
                            expanded: false,
                            command: () => {
                                this.selectedTopicId = content?.id;
                                this.selectedSubTopicId = t?.id;
                                this.selectedTopicEmitter.emit({ topic: content?.name, subTopic: t?.name })
                            },
                            items: []
                        }
                    })
                }
            });
            this.panelItems$.next(this.items);
        }

        if ('subTopics' in changes) {
            const subTopics = changes['subTopics']?.currentValue;
            const topic = this.items?.find(item => +item?.id == +this.selectedTopicId);
            const topicIndex = this.items?.findIndex(item => +item?.id == this.selectedTopicId);
            let subTopic = topic?.items?.find(sub => +sub?.id === this.selectedSubTopicId);
            const subTopicIndex = topic?.items?.findIndex(s => +s?.id === this.selectedSubTopicId)
            subTopic = {
                ...subTopic,
                expanded: true,
                command: () => { },
                items: subTopics?.map((t, index) => {
                    return {
                        label: t?.shortTitle?.replace('-', ' '),
                        command: () => this.changePageContent(t?.shortTitle, index)
                    }
                })
            };
            topic?.items?.splice(subTopicIndex, 1, subTopic);
            setTimeout(() => {
                this.cdr.detectChanges();
            }, 100)
            this.items[topicIndex].expanded = true;
            this.panelItems$.next(this.items);
        }

    };

    public ngOnInit(): void {
        this.changeNumber$.pipe(takeUntil(this.destroy$)).subscribe(res => {
            if (res >= 0) {
                const topic = this.subTopics.at(res);
                this.changePageContent(topic?.shortTitle, res);
            }
        })
    };

    private changePageContent(title: string, index: number) {
        this.store.dispatch(generalActions.setCurrentPage({
            currentPage: index
        }))
        this.selectedTitleEmitter.emit(title)
    }

    public openPanelItems(index?): void {
        console.log("items ==>", this.items);
        this.items[0].expanded = true;
        this.items[0].items[0].expanded = true;
        this.panelItems$.next(this.items);
        this.cdr.detectChanges();
    }

    public override ngOnDestroy(): void {
        super.ngOnDestroy()
    };
}