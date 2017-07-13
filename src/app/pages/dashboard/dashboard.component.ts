import { Component, Input } from '@angular/core';
import { IModel } from '../../app.service';


@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  panels: object[] = [];
  constructor(public imodel: IModel) {

  };

  ngOnInit() {
    var self = this;
    var getPanels = this.imodel.at('profile/dashboard');
    getPanels.then(function ($meta) {
      switch ($meta.$attributes.type) {
        case "group-ref":
          for (let i = 0; i < $meta.$value.length; i++) {
            self.imodel.at($meta.$value[i]).then(function (obj) {
              self.panels.push(obj);
            });
          }
          break;
      }

    });

  };



}
