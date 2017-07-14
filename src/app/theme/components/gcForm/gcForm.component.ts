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

  checkTypeAndValue(obj:any):boolean{

    if(this.isObjectValue(obj)){
      if(typeof obj.$meta.$value === 'object') return false;
    }
    
    return true;
  }
  isObjectValue(obj:any):boolean{
    return !/^number|string|currency/.test(obj.$meta.$attributes.type);
  }

  ngOnInit() {
    var self = this;


  }

}


