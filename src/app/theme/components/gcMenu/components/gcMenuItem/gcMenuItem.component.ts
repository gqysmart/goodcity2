import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'gc-menu-item',
  templateUrl: './gcMenuItem.html',
  styleUrls: ['./gcMenuItem.scss']
})
export class GcMenuItem {

  @Input() menuItem:any;
  @Input() child:boolean = false;

  @Output() itemHover = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();

  public onHoverItem($event):void {
    this.itemHover.emit($event);
  }

  public onToggleSubMenu($event, item):boolean {
    $event.item = item;
    this.toggleSubMenu.emit($event);
    return false;
  }
}
