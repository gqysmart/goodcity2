import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import { AppTranslationModule } from '../app.translation.module';

import {
  GcThemeConfig
} from './theme.config';

import {
  GcThemeConfigProvider
} from './theme.configProvider';

import {
//   BaAmChart,
//   BaBackTop,
//   BaCard,
//   BaChartistChart,
//   BaCheckbox,
//   BaContentTop,
//   BaFullCalendar,
//   BaMenuItem,
//   BaMenu,
//   BaMsgCenter,
//   BaMultiCheckbox,
//   BaPageTop,
//   BaPictureUploader,
//   BaSidebar,
//   BaFileUploader
} from './components';

// import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import {
//   BaScrollPosition,
//   BaSlimScroll,
   GcThemeRun
} from './directives';

import {
//   BaAppPicturePipe,
//   BaKameleonPicturePipe,
//   BaProfilePicturePipe
} from './pipes';

import {
  GcImageLoaderService,
  GcMenuService,
  GcThemePreloader,
  GcThemeSpinner
} from './services';

import {
//   EmailValidator,
//   EqualPasswordsValidator
} from './validators';

const NGA_COMPONENTS = [
//   BaAmChart,
//   BaBackTop,
//   BaCard,
//   BaChartistChart,
//   BaCheckbox,
//   BaContentTop,
//   BaFullCalendar,
//   BaMenuItem,
//   BaMenu,
//   BaMsgCenter,
//   BaMultiCheckbox,
//   BaPageTop,
//   BaPictureUploader,
//   BaSidebar,
//   BaFileUploader
];

const NGA_DIRECTIVES = [
//   BaScrollPosition,
//   BaSlimScroll,
//   BaThemeRun,
//   BaCardBlur
];

const NGA_PIPES = [
//   BaAppPicturePipe,
//   BaKameleonPicturePipe,
//   BaProfilePicturePipe
];

const NGA_SERVICES = [
  GcImageLoaderService,
  GcThemePreloader,
  GcThemeSpinner,
  GcMenuService
];

const NGA_VALIDATORS = [
//   EmailValidator,
//   EqualPasswordsValidator
];

@NgModule({
  declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppTranslationModule,
    NgUploaderModule
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ]
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
         GcThemeConfigProvider,
        GcThemeConfig,
        ...NGA_VALIDATORS,
         ...NGA_SERVICES
      ],
    };
  }
}
