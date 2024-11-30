import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BaseComponent } from '@app/base-component/base.component';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-blogs-sidebar',
  standalone: true,
  imports: [CommonModule, DataViewModule, ButtonModule, TagModule],
  templateUrl: './blogs-sidebar.component.html',
  styleUrl: './blogs-sidebar.component.scss'
})
export class BlogsSidebarComponent extends BaseComponent {
  @Input() blogs: any;

  constructor() {
    super()
  }

  public onPageChange(event): void {
    console.log(event);
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy()
  }
}
