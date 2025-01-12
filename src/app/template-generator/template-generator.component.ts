import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-template-generator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-generator.component.html',
  styleUrl: './template-generator.component.scss'
})
export class TemplateGeneratorComponent implements OnInit {
  editorOptions = { theme: 'myCustomTheme', language: 'java', readOnly: true };
  @Input() languageDetails: any = [];
  @Input() videoId?: any;

  constructor() { }
  mediaUrl = environment.mediaUrl;
  adsUrl = environment.adsUrl;
  public ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('languageDetails' in changes) {
      this.languageDetails = JSON.parse(this.languageDetails)
    }
  }

  isObject(obj: any) {
    return (
      obj !== null && typeof obj === 'object' && Array.isArray(obj) === false
    );
  }
}