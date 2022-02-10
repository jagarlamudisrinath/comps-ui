import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[auto-focus]'
})
export class ElementAutoFocusDirective implements AfterViewInit {
  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.element.nativeElement.focus();
    });
  }
}
