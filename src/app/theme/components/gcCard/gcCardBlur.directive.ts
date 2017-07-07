import {Directive, ElementRef, HostListener, HostBinding} from '@angular/core';
import {GcThemeConfigProvider} from '../../../theme';

import {GcCardBlurHelper} from './GcCardBlurHelper.service';
import {BgMetrics} from './bgMetrics';

@Directive({
  selector: '[gcCardBlur]',
  providers: [GcCardBlurHelper]
})
export class GcCardBlur {

  @HostBinding('class.card-blur') isEnabled:boolean = false;

  private _bodyBgSize:BgMetrics;

  constructor(private _baConfig:GcThemeConfigProvider, private _baCardBlurHelper:GcCardBlurHelper, private _el:ElementRef) {
    if (this._isEnabled()) {
      this._baCardBlurHelper.init();
      this._getBodyImageSizesOnBgLoad();
      this._recalculateCardStylesOnBgLoad();

      this.isEnabled = true;
    }
  }

  @HostListener('window:resize')
  _onWindowResize():void {
    if (this._isEnabled()) {
      this._bodyBgSize = this._baCardBlurHelper.getBodyBgImageSizes();
      this._recalculateCardStyle();
    }
  }

  private _getBodyImageSizesOnBgLoad():void {
    this._baCardBlurHelper.bodyBgLoad().subscribe(() => {
      this._bodyBgSize = this._baCardBlurHelper.getBodyBgImageSizes();
    });
  }

  private _recalculateCardStylesOnBgLoad():void {
    this._baCardBlurHelper.bodyBgLoad().subscribe((event) => {
      setTimeout(this._recalculateCardStyle.bind(this));
    })
  }

  private _recalculateCardStyle():void {
    if (!this._bodyBgSize) {
      return;
    }
    this._el.nativeElement.style.backgroundSize = Math.round(this._bodyBgSize.width) + 'px ' + Math.round(this._bodyBgSize.height) + 'px';
    this._el.nativeElement.style.backgroundPosition = Math.floor(this._bodyBgSize.positionX) + 'px ' + Math.floor(this._bodyBgSize.positionY) + 'px';
  }

  private _isEnabled() {
    return this._baConfig.get().theme.name == 'blur';
  }
}
