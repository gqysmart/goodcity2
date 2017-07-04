import {Injectable} from '@angular/core';

@Injectable()
export class GcThemePreloader {

  private static _loaders:Array<Promise<any>> = [];

  public static registerLoader(method:Promise<any>):void {
    GcThemePreloader._loaders.push(method);
  }

  public static clear():void {
   GcThemePreloader._loaders = [];
  }

  public static load():Promise<any> {
    return new Promise((resolve, reject) => {
      GcThemePreloader._executeAll(resolve);
    });
  }

  private static _executeAll(done:Function):void {
    setTimeout(() => {
      Promise.all(GcThemePreloader._loaders).then((values) => {
        done.call(null, values);

      }).catch((error) => {
        console.error(error);
      });
    });
  }
}
