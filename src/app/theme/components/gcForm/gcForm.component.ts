import {Component, ElementRef,Input} from '@angular/core';
import {IModel} from '../../../app.service';


@Component({
  selector: 'gc-form',
  templateUrl: './gcForm.html',
  styleUrls: ['./gcForm.scss']
})
export class GcForm {

  constructor(public imodel:IModel) {
    
  }
  @Input() data:any;

  controls():any[]{
    const self = this;
    var result:any[] =[];
    for (let i = 0; i < self.data.$meta.$value.length; i++) {
      var obj = self.imodel.at(self.data.$meta.$value[i]);
      result.push(obj);
    };
    return result;
  }

  checkTypeAndValueAccordance(obj:any):boolean{

    if(this.isObjectType(obj) && this.isObjectValue(obj)) return true;
    if(!this.isObjectType(obj) && !this.isObjectValue(obj)) return true;
    return false;
  }
  isObjectType(obj:any):boolean{
    return !/^number|string|currency/.test(obj.$meta.$attributes.type);
  };
  isObjectValue(obj:any):boolean{
    if(typeof obj.$meta.$value === 'object') return true;
    return false;
  }

  ngOnInit() {
    var self = this;


  }

}


