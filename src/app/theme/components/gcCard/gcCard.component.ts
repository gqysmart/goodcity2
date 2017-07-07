import {Component, Input} from '@angular/core';

@Component({
  selector: 'gc-card',
  templateUrl: './gcCard.html',
})
export class GcCard {
  @Input() title:String;
  @Input() gcCardClass:String;
  @Input() cardType:String;
}
