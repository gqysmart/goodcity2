import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { GcMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

@Component({
  selector: 'pages',
  template: 
`<gc-sidebar></gc-sidebar>
    <gc-page-top></gc-page-top>
    <div class="al-main">
      <div class="al-content">
      
        <router-outlet></router-outlet>
      </div>
    </div>`

  // `
  //   <gc-sidebar></gc-sidebar>
  //   <gc-page-top></gc-page-top>
  //   <div class="al-main">
  //     <div class="al-content">
  //       <gc-content-top></gc-content-top>
  //       <router-outlet></router-outlet>
  //     </div>
  //   </div>
  //   <footer class="al-footer clearfix">
  //     <div class="al-footer-right" translate>{{'general.created_with'}} <i class="ion-heart"></i></div>
  //     <div class="al-footer-main clearfix">
  //       <div class="al-copy">&copy; <a href="http://goodcity.net" translate>{{'general.akveo'}}</a> 2017</div>
  //       <ul class="al-share clearfix">
  //         <li><i class="socicon socicon-facebook"></i></li>
  //         <li><i class="socicon socicon-twitter"></i></li>
  //         <li><i class="socicon socicon-google"></i></li>
  //         <li><i class="socicon socicon-github"></i></li>
  //       </ul>
  //     </div>
  //   </footer>
  //   <gc-back-top position="200"></gc-back-top>
  //   `
})
export class Pages {

  constructor(private _menuService: GcMenuService,) {
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
