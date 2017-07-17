import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { CellModule } from './components/cell/cell.module';
import { FilterModule } from './components/filter/filter.module';
import { PagerModule } from './components/pager/pager.module';
import { TBodyModule } from './components/tbody/tbody.module';
import { THeadModule } from './components/thead/thead.module';

import { GcSmartTableComponent } from './gcSmartTable.component';
import {SmartTablesService} from './smartTables.service';
import { IModelEditor} from './imodelEditor.component';
import { routing } from './imodelEditor.routing'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
      NgaModule,
    CellModule,
    FilterModule,
    PagerModule,
    TBodyModule,
    THeadModule,
        routing,

  ],
  declarations: [
    GcSmartTableComponent,
    IModelEditor
  ],
  exports: [

    GcSmartTableComponent,
    IModelEditor
  ],
   providers: [
   
    SmartTablesService,
    
  ]
})
export class GcImodelEditorModule {
}
