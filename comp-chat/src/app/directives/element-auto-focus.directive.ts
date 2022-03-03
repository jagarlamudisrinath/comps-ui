import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Directive({
  selector: '[auto-focus]'
})
export class ElementAutoFocusDirective implements AfterViewInit {
  constructor(private matInput: MatInput) { }

  ngAfterViewInit() {
    setTimeout(() => this.matInput.focus(), 300);
  }
}
