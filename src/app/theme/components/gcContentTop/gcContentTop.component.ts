import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';

@Component({
  selector: 'gc-content-top',
  styleUrls: ['./gcContentTop.scss'],
  templateUrl: './gcContentTop.html',
})
export class GcContentTop {

  public activePageTitle:string = '';

  constructor(private _state:GlobalState) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        this.activePageTitle = activeLink.title;
      }
    });
  }
}
