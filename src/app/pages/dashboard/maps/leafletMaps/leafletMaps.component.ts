import {Component, ElementRef} from '@angular/core';

import 'leaflet';

@Component({
  selector: 'leaflet-maps',
  templateUrl: './leafletMaps.html',
  styleUrls: ['./leafletMaps.scss']
})
export class LeafletMaps {

  constructor(private _elementRef:ElementRef) {
  }

  ngAfterViewInit() {
    let el = this._elementRef.nativeElement.querySelector('.leaflet-maps');

    L.Icon.Default.imagePath = 'assets/img/theme/vendor/leaflet/';
    var map = L.map(el).setView([32.04,118.78], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.goodcity.net">Goodcity</a> contributors'
    }).addTo(map);

    L.marker([32.04,118.78]).addTo(map)
      .bindPopup('项目地址')
      .openPopup();
  }
}
