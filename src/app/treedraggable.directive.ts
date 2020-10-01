import { Directive, ElementRef,Renderer2 } from '@angular/core';

@Directive({
  selector: '[treeDraggable]'
})
export class TreeDraggableDirective {
  //input definition

  constructor(el: ElementRef, private renderer: Renderer2) {
    //console.log(el, viewContainer);
    this.renderer.setAttribute(el.nativeElement, "clrDroppable", "");
    this.renderer.setAttribute(el.nativeElement, "clrDraggable", "");
    this.renderer.addClass(el.nativeElement, "draggable");
    this.renderer.addClass(el.nativeElement, "droppable");
     
   }
}