import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[closeOnClickOutside]',
  standalone: true
})
export class CloseOnClickOutsideDirective {
  @Output() closeOnClickOutside: EventEmitter<void> = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      const isClosePopupButton = targetElement.classList.contains('close-popup-btn')
      if(!isClosePopupButton) {
        this.closeOnClickOutside.emit();
      }
    }
  }

}
