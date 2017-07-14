import { Component, Input } from '@angular/core';
import { IModel } from '../../app.service';


@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
 
  constructor(public imodel: IModel) {

  };

  ngOnInit() {
    var self = this;
   
  };

  panels(): any[] {
    const self = this;
    var result: any[] = [];
    var obj = this.imodel.at('profile/dashboard');
    for (let i = 0; i < obj.$meta.$value.length; i++) {
      result.push(self.imodel.at(obj.$meta.$value[i]));
    };

    return result;
  }
    
  



}
