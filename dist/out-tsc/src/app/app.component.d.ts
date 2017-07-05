import { ViewContainerRef } from '@angular/core';
import { GlobalState } from './global.state';
import { GcImageLoaderService, GcThemeSpinner } from './theme/services';
import { GcThemeConfig } from './theme/theme.config';
export declare class App {
    private _state;
    private _imageLoader;
    private _spinner;
    private viewContainerRef;
    private themeConfig;
    isMenuCollapsed: boolean;
    constructor(_state: GlobalState, _imageLoader: GcImageLoaderService, _spinner: GcThemeSpinner, viewContainerRef: ViewContainerRef, themeConfig: GcThemeConfig);
    ngAfterViewInit(): void;
    private _loadImages();
}
