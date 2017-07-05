import {Directive, Input, Output, ElementRef, EventEmitter} from '@angular/core';
import 'jquery-slimscroll';

@Directive({
  selector: '[gcSlimScroll]'
})
export class GcSlimScroll {

  @Input() public gcSlimScrollOptions:Object;

  constructor(private _elementRef:ElementRef) {
  }

  ngOnChanges(changes) {
    this._scroll();
  }

  private _scroll() {
    this._destroy();
    this._init();
  }

  private _init() {
    jQuery(this._elementRef.nativeElement).slimScroll(this.gcSlimScrollOptions);
  }

  private _destroy() {
    jQuery(this._elementRef.nativeElement).slimScroll({ destroy: true });
  }
}
