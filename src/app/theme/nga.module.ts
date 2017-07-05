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
  GcMenuItem,
  GcMenu,
  GcMsgCenter,
//   BaMultiCheckbox,
  GcPageTop,
//   BaPictureUploader,
  GcSidebar,
//   BaFileUploader
} from './components';

// import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import {
  GcScrollPosition,
  GcSlimScroll,
   GcThemeRun
} from './directives';

import {
//   BaAppPicturePipe,
//   BaKameleonPicturePipe,
  GcProfilePicturePipe
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
  GcMenuItem,
  GcMenu,
  GcMsgCenter,
//   BaMultiCheckbox,
  GcPageTop,
//   BaPictureUploader,
  GcSidebar,
//   BaFileUploader
];

const NGA_DIRECTIVES = [
  GcScrollPosition,
  GcSlimScroll,
  GcThemeRun,
//   BaCardBlur
];

const NGA_PIPES = [
//   BaAppPicturePipe,
//   BaKameleonPicturePipe,
  GcProfilePicturePipe
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
