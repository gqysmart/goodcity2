import { Injectable } from '@angular/core';

export type InternalStateType = {
  [key: string]: any
};

@Injectable()
export class AppState {
  _state: InternalStateType = {};

  constructor() {
  }

  // already return a clone of the current state
  get state() {
    return this._state = this._clone(this._state);
  }

  // never allow mutation
  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }


  get(prop?: any) {
    // use our state getter for the clone
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    // internally mutate our state
    return this._state[prop] = value;
  }


  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
};

@Injectable()
export class IModel {
  static iModel = {

    test: {
      $meta: {
        $desc: { cn: "testing" },
        $attributes: {
          type: "string", macro: { code: 'TEST("isTesting")' },
        }
      }
    },

    profile: {
      dashboard: {
        $meta: {
          $desc: { cn: "控制台" },
          $attributes: { type: "group-ref" },
          $value: ["profile/dashboard/projectSummary", "profile/dashboard/landConstraints"],
        },
        projectSummary: {
          $meta: {
            $desc: { cn: "项目描述" },
            $attributes: { type: "group-ref" },
            $value: ["project/name",]
          }
        },
        landConstraints: {
          $meta: {
            $desc: { cn: "土地使用约定" },
            $attributes: { type: "group-ref" },
            $value: ["landConstraints/blocks/no1/name", "landConstraints/blocks/no1/area", "landConstraints/blocks/no1/area/construction", "landConstraints/blocks/no1/area/confiscatedRoad", "landConstraints/blocks/no1/area/", "landConstraints/blocks/no1/area/expropriatedGreenLand", "landConstraints/blocks/no1/maxVolumeArea","test"]
          }
        }
      }
    },
    project: {
      name: {
        $meta: {
          $attributes: { type: "string" },
          $value: "xxxxxx",
          $desc: { cn: "项目名称" }
        }
      }
    }
    ,
    cost: {
      $meta: {
        $desc: { cn: "成本" },
        $attributes: {
          type: "number-currency", unit: "万元"
        },
        $value: "123456.00"
      }
    },
    landConstraints: {
      $meta: {
        $desc: { cn: "土地限定条件", en: "soil number" },
        $attributes: {
          type: "group-ref", macro: { code: 'PATH_CHILDREN(PATH_CONSTRUCT([PATH_CURRENT(),"blocks"]))', },
        },
      },
      totalNum: {
        $meta: {
          $desc: { cn: "地块数" },
          $attributes: {
            type: "number-int", macro: { code: 'PATH_CHILDREN(PATH_CONSTRUCT([PATH_PARENT(),"blocks"])).length' },
          }
        }
      },
      totalArea: {
        $meta: {
          $desc: { cn: "总用地面积" },
          $attributes: {
            type: "number-double", macro: { code: 'let blocks=PATH_CONSTRUCT([PATH_CHILDREN([PATH_CURRENT(),"..","blocks"]),"area"];OPERATOR_SUM(blocks);', },
          }
        }
      },
      blocks: {
        $meta: {
          $attributes: {
            type: "group-ref", macro: { code: 'PATH_CHILDREN()' }, template: "landConstraints/blocks/no1"
          }
        },
        no1: {
          $meta: {
            $desc: { cn: "地块1", en: "no1" }, $attributes: {
              type: "group-ref", macro: { code: 'PATH_CHILDREN()' }, template: "landConstraints/blocks/no1"
            }
          },
          name: {
            $meta: {
              $desc: { cn: "土地编号/名称", en: "soil number" },
              $attributes: { type: "string", },
              $value: "xxxxx",
            },

          },
          maxVolumeArea: {
            $meta: {
              $desc: { cn: "地块最大计容面积" },
              $attributes: { type: "number-double", unit: "平方米", macro: { code: 'OPERATOR_MULTI([INTERVAL_MAX(PATH_CONSTRUCT([PATH_PARENT(),"ratio"])),PATH_CONSTRUCT([PATH_PARENT(),"area"])])' } },
            }
          },
          area: {
            $meta: {
              $desc: { cn: "总用地面积" },
              $attributes: {
                filters: { chain: [], custom: {} },
                validators: { check: {}, custom: {} },
                type: "number-double",
                unit: "公顷",
                macro: { code: 'OPERATOR_SUM(PATH_CHILDREN())', custom: {} }
              },
            },

            construction: {
              $meta: {
                $desc: { cn: "建设用地面积" },
                $attributes: {
                  type: "number-double",
                  unit: "亩"
                },
                $value: 23,
              }

            },
            confiscatedRoad: {
              $meta: {
                $desc: { cn: "代征道路面积" },
                $attributes: {
                  type: "number",
                  unit: "亩"
                },
                $value: 0,
              }

            },
            expropriatedGreenLand: {
              $meta: {
                $desc: { cn: "代征绿地面积" },
                $attributes: {
                  type: "number",
                  unit: "亩"
                },
                $value: 0,
              }

            }
          },
          ratio: {
            $meta: {
              $attributes: { type: "interval-number", },
              $desc: { cn: "容积率", en: "project name" },
              $value: { upperLimit: { value: 8.0, open: true }, lowerLimit: { value: 0, open: false } }
            }
          },
          location: {
            $meta: {
              $attributes: { type: "location", },
              $desc: { cn: "土地所在地区", en: "project name" },
              $value: {
                address: { country: "中国", province: "江苏", city: "南京", "districtsCountry": "鼓楼", block: "xxxx" },
                gis: { lat: 38, long: 118 }
              },
            }

          },
        },

      }


    },
  };
  static iCache = {

  };
  constructor() { };


  public async load(propPath?: string): Promise<any> {
    var self = this;
    const imodel: object = IModel.iModel;
    var obj = imodel;

    if (!self.hasLoaded(propPath)) {
      if (!self.hasCached(propPath)) {
        await self.getByHttp(propPath).then(function (root) {
          obj = self.getObjectSync(propPath);
          return obj;

        }, function (reason) {
          throw reason;
        });
      } else {
        await self.getFromCache(propPath).then(function (root) {
          obj = self.getObjectSync(propPath);
          return obj;

        }, function (reason) {
          throw reason;
        });

      }

    } else {
      obj = self.getObjectSync(propPath);
      return obj;

    }

  };

  hasCached(propPath: string): boolean {
    return false;
  }
  hasLoaded(propPath: string): boolean {
    var self = this;
    const imodel: object = IModel.iModel;
    if (!propPath) {
      return false;
    } else {
      var paths: string[] = propPath.split('/');
      const root = paths[0];
      if (imodel[root]) return true;
      return false;
    }
  };

  private getObjectSync(propPath?: string): any {
    var self = this;
    const imodel: object = IModel.iModel;
    var obj = imodel;
    if (!propPath) {
      return imodel;
    } else {
      var paths: string[] = propPath.split('/');
      for (let i = 0; i < paths.length; i++) {
        if (obj.hasOwnProperty(paths[i])) {
          obj = obj[paths[i]];
        } else {
          obj = undefined;
          break;
        }
      }
    }
    return obj;
  };


  at(propPath?: string, locale?: string): any {
    const self = this;
    const mockObj = { $meta: { $desc: propPath, $attributes: { type: "mocking-obj" }, at: { path: propPath }, mock: true } };
    if (self.hasLoaded(propPath)) {
      var obj = self.getObjectSync(propPath);
      if (!obj && mockObj.$meta.at) {
        mockObj.$meta['at']['error'] = "指定路径不存在对象";
        return mockObj;
      }
      if (!obj.$meta.at) {
        obj.$meta.at = { path: propPath };
      }
      var meta = obj.$meta;
      if (meta && !meta['compile']) {
        self.compile(obj, propPath);
      }
      return obj;

    } else {

      self.load(propPath).then(
        function (obj) {
          obj.$meta['at'] = mockObj.$meta.at;
          mockObj.$meta = obj.$meta;


        }, function (reason) {
          mockObj.$meta['at']['error'] = reason;
        }
      );
      return mockObj;
    }
  };

  private async cacheData(path: string, data: any): Promise<any> {
    console.log("caching " + path);

  };
  private async saveData(path: string, data: any): Promise<any> {
    console.log("saving " + path);

  };
  private async validatorData(obj: any, data: any): Promise<any> {
    console.log("validating ");

  };
  filter(obj: any, data: any): any {
    return data;
  }
  register(path: any, event: string, callback: any) {

  }
  compile(obj: any, currentPath: string): any {
    const self = this;
    if (obj.$meta['compile']) return obj;
    obj.$meta['compile'] = { compiled: false, };

    if (obj.$meta.$value) {
      let _value = obj.$meta.$value;
      delete obj.$meta.$value;
      Object.defineProperty(obj.$meta, '$value',
        {
          get: function () { return self.filter(obj, _value) },
          set: function (newValue) {
            self.validatorData(obj, newValue);
            self.cacheData(currentPath, _value);
            self.saveData(currentPath, newValue);
            _value = newValue;
          },
        });
      obj.$meta['compile']['compiled'] = true;

    } else if (obj.$meta.$attributes && obj.$meta.$attributes.macro) {
      var macro: any = obj.$meta.$attributes.macro;
      var dependencies = macro.dependencies;//显性依赖
      if (dependencies && dependencies.length && dependencies.length > 0) {
        self.loadDependencies(dependencies).then(function () {
          obj.$meta['compile']['compiled'] = true;
        }, function (reason) {
          obj.$meta['compile']['compiled'] = false;
          obj.$meta['compile']['error'] = reason;
        });
      }

      const reason_calculating = { $reason: "calculating" };
      const reason_error = { $reason: "error" };
      Object.defineProperty(obj.$meta, '$value', {
        get: function () {

          if (obj.$meta['compile']['compiled'] !== true) return reason_calculating;
          //return { $reason: obj.$meta['compile']['error'] ? obj.$meta['compile']['error'] : "loading compiling dependencies" };
          if (!obj.$meta['macro']) {
            obj.$meta['macro'] = { 'status': 'finished' };
          };
          if (obj.$meta['macro']['status'] !== 'finished') {
            if (/^error/.test(obj.$meta['macro']['status'])) {
              return reason_error;
              //return { $reason: obj.$meta['macro']['error'] ? obj.$meta['macro']['error'] : "macro error" };
            } else {
              return reason_calculating;
            }
          };

          try {
            var result = self.execMacro(obj);

            return self.filter(obj, result);
          } catch (e) {
            if (/^error/.test(obj.$meta['macro']['status'])) {
              return reason_error;
              //return { $reason: obj.$meta['macro']['error'] ? obj.$meta['macro']['error'] : "macro error" };
            } else {
              return reason_calculating;
            }
          }

        }
      });

      obj.$meta['compile']['compiled'] = true;

    }
    else {
      obj.$meta['compile'] = { compiled: true, };
    }
    return obj;
  };

  getByHttp(prop: string, missing?: string): Promise<any> {
    var result: Promise<any> = new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log("get from http.")
        resolve({});
      })
    });
    return result;
  };
  getFromCache(prop: string, missing?: string): Promise<any> {
    var result: Promise<any> = new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log("get from cache.")
        resolve({});
      })
    });
    return result;
  };
  loadDependencies(dependencies: string[]): Promise<any> {
    const self = this;

    var dependenciesLoad: Promise<any>[] = [];
    for (let i = 0; i < dependencies.length; i++) {
      if (!self.hasLoaded(dependencies[i]))
        dependenciesLoad.push(self.load(dependencies[i]));
    }
    return Promise.all(dependenciesLoad);

  };
  unitValueTransform(obj: any, sourceUnit: string, destinationUnit: string): any {
    if (!sourceUnit && !destinationUnit) return obj;
    if ((!sourceUnit && destinationUnit) || (sourceUnit && !destinationUnit)) {
      throw "not matched";

    }

    var baseRelations = {
      currency: { "元": 1, "万元": 10000, "亿元": 100000000, }
      , length: { "米": 1, "厘米": 1 / 100, "分米": 1 / 10, '毫米': 1 / 1000, },
      area: { '平方米': 1, "公顷": 10000, '亩': 10000 / 15, },
      $normal:{'':1,'%':1/100,'‰':1/1000}
    };
   
    if (baseRelations["$normal"].hasOwnProperty(sourceUnit)) {
      if (!baseRelations['$normal'].hasOwnProperty(destinationUnit)) {
        return baseRelations["$normal"][sourceUnit] * obj;
      }
    }
//
    var matchedCategory;
    for (let key in baseRelations) {
      if (baseRelations[key].hasOwnProperty(destinationUnit)) {
        if (baseRelations[key].hasOwnProperty(sourceUnit)) {
          matchedCategory = key;
          break;
        }
        throw 'not matched';
      }
    }

    if (!matchedCategory) throw "not matched";
    var sourceRatio = baseRelations[matchedCategory][sourceUnit];
    var destinationRatio = baseRelations[matchedCategory][destinationUnit];
    return sourceRatio * obj / destinationRatio;

  };
  execMacro(context: any): any {
    const $self = this;
    const $code = context.$meta.$attributes.macro.code;
    const $type = context.$meta.$attributes.type;
    const $unit = context.$meta.$attributes.unit;
    const $atPath = context.$meta['at']['path'];
    const $waitings: Promise<any>[] = [];

    try{
      let macroInnerValue = eval($code);
      if(macroInnerValue && macroInnerValue['$$result']){
       return $self.unitValueTransform(macroInnerValue['$$result'],macroInnerValue['$$unit'],$unit);
      }
     return macroInnerValue;
    }catch(e){
      throw e;
    }

    function TEST(prompt: string): string {
      if (context.$meta.macro['status'] !== "finished") throw { reason: "nofinished" };
      context.$meta.macro['status'] = "starting";
      context.$meta.macro['status'] = "finished";

      return prompt;
    }

    function PATH_CHILDREN(path?: string) {
      if (context.$meta.macro['status'] !== "finished") throw { reason: "nofinished" };
      context.$meta.macro['status'] = "starting"
      var result: string[] = [];
      if (!path) {
        path = context.$meta.at.path;
      }
      var obj = $self.at(path);
      for (let key in obj) {
        if (key !== '$meta') {
          result.push(path + "/" + key);
        }
      }
      context.$meta.macro['status'] = "finished"
      return result;
    };
    function PATH_CONSTRUCT(seqs: string[]) {
      if (context.$meta.macro['status'] !== "finished") throw { reason: "nofinished" };
      context.$meta.macro['status'] = "starting";

      if (!seqs || seqs.length === 0) {
        context.$meta.macro['status'] = "finished";
        return $atPath;
      }
      var origins:any = seqs[0];
      var returnArray = true;
      if (!(typeof seqs[0] === 'object')) {
        returnArray = false;
        origins = [seqs[0]];
      }
      var results: any[] = [];

      for (let baseNum = 0; baseNum < origins.length; baseNum++) {
        var result: string = origins[baseNum];

        for (let i = 1; i < seqs.length; i++) {
          let seq = seqs[i];
          if (seq === '.' || seq === "..") {
            if (seq === '.') continue;
            if (seq === "..") {
              if (result === '') break;
              var lastIndex = result.lastIndexOf("/");
              if (lastIndex > 0) { result = result.slice(0, lastIndex) }
              else {
                result = '';
              };
            }

          } else {
            result = result + '/' + seqs[i];
          }

        }
        while (result[0] === "/") {
          result = result.slice(1);
        }
        while (result[result.length - 1] === "/") {
          result = result.slice(0, result.length - 1);
        }

        results.push(result);
      }


      context.$meta.macro['status'] = "finished";
      if (returnArray) { return results }
      else { return results[0] }

    };
    function PATH_CURRENT() {
      if (context.$meta.macro['status'] !== "finished") throw { reason: "nofinished" };
      context.$meta.macro['status'] = "starting"
      var result = $atPath;
      context.$meta.macro['status'] = "finished";
      return result;
    };
    function PATH_PARENT() {
      if (context.$meta.macro['status'] !== "finished") throw { reason: "nofinished" };
      context.$meta.macro['status'] = "starting"
      var result = $atPath;
      var lastIndex = result.lastIndexOf("/");
      if (lastIndex > 0) { result = result.slice(0, lastIndex) }
      else {
        result = '';
      };
      context.$meta.macro['status'] = "finished";
      return result;
    };
    function OPERATOR_ONE() {
      return { $$result: 1, $$type: "number-double" };
    }
    function OPERATOR_ZERO() {
      return { $$result: 0, $$type: "number-double" };
    }
    function OPERATOR_SUM(opers: any[]) {
      try {
        $$macroHeader(opers);

        return $$macroFooter(opers, routine);
      } catch (e) {
        throw e;
      }
      function routine(calcObject: any, lastRst: any, index: number) {
        var sum;
        var targetUnit;
        var currencyType;
        var value = calcObject["$$result"];
        var unit = calcObject["$$unit"];
        if (!lastRst) {
          sum = 0;
          targetUnit = calcObject["$$unit"]?calcObject["$$unit"]:"" ;
          currencyType = calcObject["$$type"];

        } else {
          sum = lastRst['$$result'];
          targetUnit = lastRst['$$unit']?lastRst['$$unit']:"";
          currencyType = lastRst["$$type"];
        }

        if (targetUnit === 'number-currency') {//精确计算
          try {
            sum += $self.unitValueTransform(Number(value), unit, targetUnit);//暂时以double精度计算。

          }
          catch (e) {
            context.$meta.macro['status'] = "error-unit-notmatched";
            context.$meta.macro['error'] = "unit not matched";
            throw { reason: "not matched" };

          }
        }
        else {
          try {
            sum += $self.unitValueTransform(Number(value), unit, targetUnit);//暂时以double精度计算。

          }
          catch (e) {
            context.$meta.macro['status'] = "error-unit-notmatched";
            context.$meta.macro['error'] = "unit not matched";
            throw { reason: "not matched" };

          }
        }
        return { $$result: sum, $$type: currencyType, $$unit: targetUnit };

      }

    }; 
    
    function OPERATOR_MULTI(opers: any[]) {
      try {
        $$macroHeader(opers);

        return $$macroFooter(opers, routine);
      } catch (e) {
        throw e;
      }
      function routine(calcObject: any, lastRst: any, index: number) {
        var sum;
        var targetUnit;
        var currencyType;
        var value = calcObject["$$result"];
        var unit = calcObject["$$unit"];
       if (!lastRst) {
          sum = 1;
          targetUnit = calcObject["$$unit"]?calcObject["$$unit"]:"" ;
          currencyType = calcObject["$$type"];

        } else {
          sum = lastRst['$$result'];
          targetUnit = lastRst['$$unit']?lastRst['$$unit']:"";
          currencyType = lastRst["$$type"];
        }

        if (targetUnit === 'number-currency') {//精确计算
          try {
            sum *= Number(value);
            targetUnit += unit ? unit : '';//暂时以double精度计算。
          }
          catch (e) {
            context.$meta.macro['status'] = "error-unit-notmatched";
            context.$meta.macro['error'] = "unit not matched";
            throw { reason: "not matched" };

          }
        }
        else {
          try {
            sum *= Number(value);
            targetUnit +=  unit ? unit : '';//暂时以double精度计算。

          }
          catch (e) {
            context.$meta.macro['status'] = "error-unit-notmatched";
            context.$meta.macro['error'] = "unit not matched";
            throw { reason: "not matched" };

          }
        }
        return { $$result: sum, $$type: currencyType, $$unit: targetUnit };

      }

    };
    function OPERATOR_MINUS(opers: any[]) {
      try {
        $$macroHeader(opers);

        return $$macroFooter(opers, routine);
      } catch (e) {
        throw e;
      }
      function routine(calcObject: any, lastRst: any, index: number) {
        var sum;
        var targetUnit;
        var currencyType;
        var value = calcObject["$$result"];
        var unit = calcObject["$$unit"];
        if (!lastRst) {
          sum = 0;
          targetUnit = calcObject["$$unit"]?calcObject["$$unit"]:"" ;
          currencyType = calcObject["$$type"];

        } else {
          sum = lastRst['$$result'];
          targetUnit = lastRst['$$unit']?lastRst['$$unit']:"";
          currencyType = lastRst["$$type"];
        }

        if (targetUnit === 'number-currency') {//精确计算
          try {
            sum *= index === 0 ? Number(value) : 1 / Number(value);

            targetUnit += unit ? '/' + unit : '';//暂时以double精度计算。
          }
          catch (e) {
            context.$meta.macro['status'] = "error-unit-notmatched";
            context.$meta.macro['error'] = "unit not matched";
            throw { reason: "not matched" };

          }
        }
        else {
          try {
            sum *= index === 0 ? Number(value) : 1 / Number(value);
            targetUnit +=  unit ? '/' + unit : '';//暂时以double精度计算。
          }
          catch (e) {
            context.$meta.macro['status'] = "error-unit-notmatched";
            context.$meta.macro['error'] = "unit not matched";
            throw { reason: "not matched" };

          }
        }
        return { $$result: sum, $$type: currencyType, $$unit: targetUnit };
      }


    };

    function OPERATOR_DIVIDE(opers: any[]) {
      try {
        $$macroHeader(opers);

        return $$macroFooter(opers, routine);
      } catch (e) {
        throw e;
      }
      function routine(calcObject: any, lastRst: any, index: number) {
        var sum;
        var targetUnit;
        var currencyType;
        var value = calcObject["$$result"];
        var unit = calcObject["$$unit"];
        if (!lastRst) {
          sum = 1;
          targetUnit = calcObject["$$unit"]?calcObject["$$unit"]:"" ;
          currencyType = calcObject["$$type"];

        } else {
          sum = lastRst['$$result'];
          targetUnit = lastRst['$$unit']?lastRst['$$unit']:"";
          currencyType = lastRst["$$type"];
        }

        if (targetUnit === 'number-currency') {//精确计算
          try {
            sum *= index === 0 ? Number(value) : 1 / Number(value);
            targetUnit +=  unit ? '/' + unit : '';//暂时以double精度计算。
          }
          catch (e) {
            context.$meta.macro['status'] = "error-unit-notmatched";
            context.$meta.macro['error'] = "unit not matched";
            throw { reason: "not matched" };

          }
        }
        else {
          try {
            sum *= index === 0 ? Number(value) : 1 / Number(value);
            targetUnit += unit ? '/' + unit : '';//暂时以double精度计算。

          }
          catch (e) {
            context.$meta.macro['status'] = "error-unit-notmatched";
            context.$meta.macro['error'] = "unit not matched";
            throw { reason: "not matched" };

          }
        }
        return { $$result: sum, $$type: currencyType, $$unit: targetUnit };

      }


    };
    function INTERVAL_MIN(path: string) {
      try {
        $$macroHeader(path);

        return $$macroFooter(path, routine);
      } catch (e) {
        throw e;
      }
      function routine(calcObject: any, lastRst: any) {
         calcObject['$$result'] = calcObject['$$result']['lowerLimit']['value'];
return calcObject;
      };
    };
    function INTERVAL_MAX(path: string) {
      try {
        $$macroHeader(path);

        return $$macroFooter(path, routine);
      } catch (e) {
        throw e;
      }
      function routine(calcObject: any, lastRst: any) {
        calcObject['$$result'] = calcObject['$$result']['upperLimit']['value'];
return calcObject;
      };
    };
    function INTERVAL_RANDOM(path: string) {
      try {
        $$macroHeader(path);

        return $$macroFooter(path, routine);
      } catch (e) {
        throw e;
      }

      function routine(calcObject: any, lastRst: any) {
        calcObject['$$result'] =calcObject['$$result']['lowerLimit']['value']+ (calcObject['$$result']['upperLimit']['value'] - calcObject['$$result']['lowerLimit']['value']) * Math.random();
        return  calcObject;

      };
    };
    function $$macroHeader(params: any) {
      if (context.$meta.macro['status'] !== "finished") throw { reason: "nofinished" };
      context.$meta.macro['status'] = "starting";

      var opers = typeof params === 'object' ? params : !params?[]:[params];

      var dependencies: Promise<any>[] = [];
      for (let i = 0; i < opers.length; i++) {
        if (typeof opers[i] === "string" && !$self.hasLoaded(opers[i])) { dependencies.push($self.load(opers[i])); }
      }
      if (dependencies.length > 0) {
        context.$meta.macro['status'] = "loadingDependencies";

        Promise.all(dependencies).then(function (obj) {

          context.$meta.macro['status'] = "finished";
        }, function (reason) {
          context.$meta.macro['status'] = "error-loading-dependencies";
        });

        throw { reason: "loading" };
      }

    };
    function $$macroFooter(params: any, doRoutine: any) {
      const self = this;


      var opers = typeof params === 'object' ? params : !params?[]:[params];
            var lastRst;
            if(opers.length ===0&& doRoutine) lastRst = doRoutine();
      for (let i = 0; i < opers.length; i++) {
        var calcObject;
        if (typeof opers[i] === 'string') {
          let obj = $self.at(opers[i]);
          if (obj.mock) {
            context.$meta.macro['status'] = 'error-path-notexist';
            context.$meta.macro['error'] = 'path ' + opers[i] + ' notexist'
            throw { reason: "object not exist" };
          }
          var value = obj.$meta.$value;
          if (value && value.$reason) {
            var waiting = new Promise(function (resolve, reject) {
              var startTime = Date.now();
              function checkGettable() {
                let target = obj;
                let value = target.$meta.$value;
                if (value && value.$reason) {
                  if (Date.now() - startTime > 30000) {
                    reject('timeout');
                  } else {
                    setTimeout(function () {
                      checkGettable();
                    });
                  }

                } else {
                  resolve();
                }

              }
              setTimeout(function () {
                checkGettable();

              });
            });
            self.$waitings.push(waiting);
            continue;
          } else {
            calcObject = { $$result: value, $$unit: obj.$meta.$attributes.unit, $$type: obj.$meta.$attributes.type };
          }
        } else {
          calcObject = opers[i];
        }
        lastRst = doRoutine(calcObject, lastRst, i);
      }
      if ($waitings.length > 0) {
        context.$meta.macro['status'] = "waiting";

        Promise.all($waitings).then(function () {
          context.$meta.macro['status'] = "finished";
          self.$waitings =[];

        }, function (reason) {
         self.$waiting =[];
          context.$meta.macro['status'] = "error-waiting-timeout";
        });
        throw { reason: 'waiting' };
      };

      context.$meta.macro['status'] = "finished";
      return lastRst;
    };

  }
}
