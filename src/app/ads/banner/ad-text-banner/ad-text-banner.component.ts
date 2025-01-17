import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-text-banner',
  standalone: true,
  templateUrl: './ad-text-banner.component.html',
  styleUrl: './ad-text-banner.component.scss',
  template: `
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-8535817066678874"
         data-ad-slot="5988138287"
         data-ad-format="auto"
         data-full-width-responsive="true">
    </ins>`,
  imports: [],
  styles: []
})
export class AdTextBannerComponent {
  ngOnInit() {
    (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
  }
}
