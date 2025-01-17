import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdTextBannerComponent } from './ad-text-banner.component';

describe('AdTextBannerComponent', () => {
  let component: AdTextBannerComponent;
  let fixture: ComponentFixture<AdTextBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdTextBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdTextBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
