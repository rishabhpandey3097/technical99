import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@app/base-component/base.component';
import { IAppState } from '@app/store/reducers/app.state';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Observable, distinctUntilChanged, takeUntil } from 'rxjs';
import { isEqual } from 'lodash-es';

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
    @Output() selectedTopicEmitter = new EventEmitter<any>();
    @Output() selectedTitleEmitter = new EventEmitter<string>();

    public selectedTopicId: number;
    public selectedSubTopicId: number;
    public items: MenuItem[];

    constructor(private cdr: ChangeDetectorRef, private store: Store<IAppState>) {
        super()
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if ('sideBarContent' in changes) {
            this.items = changes?.['sideBarContent'].currentValue?.map(content => {
                return {
                    id: content?.id,
                    label: content?.name,
                    icon: 'pi pi-plus',
                    items: content?.topics?.map(t => {
                        return {
                            id: t?.id,
                            label: t?.name,
                            icon: 'pi pi-plus',
                            command: () => {
                                this.selectedTopicId = content?.id;
                                this.selectedSubTopicId = t?.id;
                                this.selectedTopicEmitter.emit({ topic: content?.name, subTopic: t?.name })
                            },
                            items: []
                        }
                    })
                }
            })
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
                items: subTopics?.map(t => {
                    return {
                        label: t?.shortTitle?.replace('-', ' '),
                        icon: 'pi pi-file',
                        command: () => this.selectedTitleEmitter.emit(t?.shortTitle)
                    }
                })
            };
            topic?.items?.splice(subTopicIndex, 1, subTopic);
            // this.items?.splice(topicIndex, 1, topic);
            setTimeout(() => {
                this.cdr.detectChanges();
            }, 100)
        }
    };

    public ngOnInit(): void { };

    public override ngOnDestroy(): void {
        super.ngOnDestroy()
    };
}