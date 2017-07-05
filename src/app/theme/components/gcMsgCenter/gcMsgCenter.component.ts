import {Component} from '@angular/core';

import {GcMsgCenterService} from './gcMsgCenter.service';

@Component({
  selector: 'gc-msg-center',
  providers: [GcMsgCenterService],
  styleUrls: ['./gcMsgCenter.scss'],
  templateUrl: './gcMsgCenter.html'
})
export class GcMsgCenter {

  public notifications:Array<Object>;
  public messages:Array<Object>;

  constructor(private _gcMsgCenterService:GcMsgCenterService) {
    this.notifications = this._gcMsgCenterService.getNotifications();
    this.messages = this._gcMsgCenterService.getMessages();
  }

}
