import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSubTopNavComponent } from './language-sub-top-nav.component';

describe('LanguageSubTopNavComponent', () => {
  let component: LanguageSubTopNavComponent;
  let fixture: ComponentFixture<LanguageSubTopNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSubTopNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LanguageSubTopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
