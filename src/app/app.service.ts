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


    profile: {
      dashboard: {
        $meta: {
          $desc: { cn: "控制台" },
          $attributes: { type: "group-ref" },
          $value: ["profile/dashboard/projectSummary", "profile/dashboard/projectSummary2"],
        },
        projectSummary: {
          $meta: {
            $desc: { cn: "项目描述" },
            $attributes: { type: "group-ref" },
            $value: ["project/name", "landConstraints"]
          }
        },
        projectSummary2: {
          $meta: {
            $desc: { cn: "项目描述2" },
            $attributes: { type: "group-ref" },
            $value: ["project/name", "landConstraints/blocks/no1/area/confiscatedRoad", "cost"]
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
          type: "currency", unit: { category: "currency", value: "万元" }
        },
        $value: "123456.00"
      }
    },
    landConstraints: {
      $meta: {
        $desc: { cn: "土地限定条件", en: "soil number" },
        $attributes: {
          type: "group-ref", macro: { code: 'CHILDREN("blocks")', },
        },
      },
      totalNum: {
        $desc: { cn: "地块数" },
        $attributes: {
          type: "number-int", macro: { code: 'CHILDREN([CURRENT_PATH(),"..","blocks"]).length' },
        }
      },
      totalArea: {
        $meta: {
          $desc: { cn: "总用地面积" },
          $attributes: {
            type: "number-double", macro: { code: 'let blocks=CHILDREN([CURRENT_PATH(),"..","blocks"]);let result=0;for(let i=0;i<blocks.length;i++){}', },
          }
        }
      },
      blocks: {
        $meta: {
          $atrributes: {
            type: "group-ref", macro: { code: 'CHILDREN()' }, template: "landConstraints/blocks/no1"
          }
        },
        no1: {
          $meta: { $desc: { cn: "地块1", en: "no1" }, $options: { tags: { "block-fragment": true } } },
          name: {
            $meta: {
              $desc: { cn: "土地编号/名称", en: "soil number" },
            },
            $attributes: { type: "string", },
            $value: "xxxxx",
          },
          area: {
            $meta: {
              $desc: { cn: "总用地面积" },
              $attributes: {
                type: "macro",
                unit: { category: "area", value: "亩" }
              },
              $value: "SUMCHILDREN()",

            },

            construction: {
              $meta: {
                $desc: { cn: "建设用地面积" },
                $attributes: {
                  type: "number",
                  unit: { category: "area", value: "亩" }
                },
                $value: 23,
              }

            },
            confiscatedRoad: {
              $meta: {
                $desc: { cn: "代征道路面积" },
                $attributes: {
                  type: "number",
                  unit: { category: "area", value: "亩" }
                },
                $value: 0,
              }

            },
            expropriatedGreenLand: {
              $meta: {
                $desc: { cn: "代征绿地面积" },
                $attributes: {
                  type: "number",
                  unit: { category: "area", value: "亩" }
                },
                $value: 0,
              }

            }
          },
          location: {
            $meta: {
              $attributes: { type: "location", },
              $desc: { cn: "土地所在地区", en: "project name" },
              $value: {
                address: { country: "中国", province: "江苏", city: "南京", "区县": "鼓楼", block: "xxxx" },
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
      var meta = obj.$meta;
      if (meta && !meta['compile']) {
        self.compile(obj, propPath);
      }
      return obj;

    } else {

      self.load(propPath).then(
        function (obj) {
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
  compile(obj: any, currentPath: string): any {
    const self = this;
    if (obj.$meta['compile']) return obj;
    obj.$meta['compile'] = { compiled: false, };

    if (obj.$meta.$value) {
      let _value = obj.$meta.$value;
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

    } else if (obj.$meta.$atrributes && obj.$meta.$atrributes.macro) {
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
      Object.defineProperty(obj.$meta, '$value', {
        get: function () {
          if (obj.$meta['compile']['compiled'] !== true)
            return { $reason: obj.$meta['compile']['error'] ? obj.$meta['compile']['error'] : "loading compiling dependencies" };
          if (obj.$meta['macro'] && obj.$meta['macro']['status'] !== 'finished') {
            if (/^error/.test(obj.$meta['macro']['status'])) {
              return { $reason: obj.$meta['macro']['error'] ? obj.$meta['macro']['error'] : "macro error" };
            } else {
              return { $reason: "calculating" }
            }
          }

          try {
            var result = self.execMacro(obj);
            return self.filter(obj, result);
          } catch (e) {
            if (/^error/.test(obj.$meta['macro']['status'])) {
              return { $reason: obj.$meta['macro']['error'] ? obj.$meta['macro']['error'] : "macro error" };
            } else {
              return { $reason: "calculating" }
            }
          }

        }
      });
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
  execMacro(context: any): any {
    const self = this;
    const code = context.$meta.$atrributes.macro.code;
    const path = context.$meta['at']['path'];
    context.$meta.macro = { status: 'starting' }
    function CHILDREN(subPath?: string) {
      if (context.$meta.macro['status'] !== "finished") throw { reason: "nofinished" };
      context.$meta.macro['status'] = "starting"
      var result: string[] = [];
      var currentPath = path;
      if (subPath) {
        currentPath = currentPath + '/' + subPath;
      }
      var obj = self.at(currentPath);
      for (let key in obj) {
        if (key !== '$meta') {
          result.push(currentPath + "/" + key);
        }
      }
      context.$meta.macro['status'] = "finished"
      return result;
    };
    function CONSTRUCT_PATH(seqs: string[]) {
      if (context.$meta.macro['status'] !== "finished") throw { reason: "nofinished" };
      context.$meta.macro['status'] = "starting";
      var result: string = '';
      for (let i = 0; i < seqs.length; i++) {
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

      context.$meta.macro['status'] = "finished";
      return result;

    };
    function CURRENT_PATH() {
      if (context.$meta.macro['status'] !== "finished") throw { reason: "nofinished" };
      context.$meta.macro['status'] = "starting"
      var result = path;
      context.$meta.macro['status'] = "finished";
      return result;
    };
    // function EXECMACRO(code: string) {

    //   if (context.$meta.macro['status'] !== "finished") throw { reason: "nofinished" };
    //   context.$meta.macro['status'] = "starting";
    //   var result = eval(code);
    //   context.$meta.macro['status'] = "finished";
    //   return result;
    // };
    function OPERATOR_NUM(operator: string, opers: string[]) {
      if (context.$meta.macro['status'] !== "finished") throw { reason: "nofinished" };
      context.$meta.macro['status'] = "starting";
      switch (operator) {
        case 'add':
  
          if (!opers || (opers.length && opers.length === 0)) return 0;
          var dependencies: Promise<any>[] = [];
          for (let i = 0; i < opers.length; i++) {
            if (!self.hasLoaded(opers[i])) { dependencies.push(self.load(opers[i])); }
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

          const unit = self.at(opers[0]).$atrributes.unit;
          var sum = 0;
          var waitings: Promise<any>[] = [];
          for (let i = 0; i < opers.length; i++) {
            let obj = self.at(opers[i]);
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
              waitings.push(waiting);
              continue;
            } else {

              if (unit && unit.category === "currency") {//精确计算
                sum += Number(value);
              } else {
                sum += Number(value);
              }

            }

          }

          if (waitings.length > 0) {
            context.$meta.macro['status'] = "waiting";

            Promise.all(waitings).then(function () {
              context.$meta.macro['status'] = "finished";

            }, function (reason) {
              context.$meta.macro['status'] = "error-waiting-timeout";
            });
            throw { reason: 'waiting' };
          };

          context.$meta.macro['status'] = "finished";
          return sum;
      }

    }
    try {
      var result = eval(code);
      return result;
    } catch (e) {
      throw e;
    }
  };
};