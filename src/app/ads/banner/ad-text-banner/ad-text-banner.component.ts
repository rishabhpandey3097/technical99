import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-text-banner',
  standalone: true,
  templateUrl: './ad-text-banner.component.html',
  styleUrl: './ad-text-banner.component.scss',
  template: `
    <ins class="adsbygoogle"
      style="display:block"
      data-ad-format="fluid"
      data-ad-layout-key="-fc+5g+70-cl-1m"
      data-ad-client="ca-pub-4361293916080487"
      data-ad-slot="4005912392">
    </ins>`,
  imports: [],
  styles: []
})
export class AdTextBannerComponent {
  ngOnInit() {
    (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
  }
}
