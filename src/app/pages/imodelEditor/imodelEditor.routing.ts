import { Routes, RouterModule } from '@angular/router';

import { IModelEditor } from './imodelEditor.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: IModelEditor,
    
  }
];

export const routing = RouterModule.forChild(routes);
