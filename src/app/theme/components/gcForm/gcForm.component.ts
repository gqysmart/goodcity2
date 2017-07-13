import {Component, ElementRef,Input} from '@angular/core';
import {IModel} from '../../../app.service';


@Component({
  selector: 'gc-form',
  templateUrl: './gcForm.html',
  styleUrls: ['./gcForm.scss']
})
export class GcForm {
  controls:any[]=[];
  constructor(public imodel:IModel) {
    
  }
  @Input() data:any;
  
  ngOnInit(){
    var self = this;
    switch(self.data.$attributes.type){
      case 'group-ref':
      for(let i=0;i<self.data.$value.length;i++){
        self.imodel.at(self.data.$value[i]).then(function(obj){
          self.controls.push(obj);
        })
      }
      break;




    }
    
  }


}
