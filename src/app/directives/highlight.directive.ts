import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(
    private element: ElementRef
  ) {}

  @HostListener('mouseenter') onMouseEnter(){
    this.element.nativeElement.style.backgroundColor='yellow';
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.element.nativeElement.style.backgroundColor='';
  }
}
