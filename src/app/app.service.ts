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
            $value: ["project/name", "landConstraints/blocks/no1/area/confiscatedRoad","cost"]
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
    cost:{
      $meta:{
        $desc:{cn:"成本"},
        $attributes:{
          type:"currency",unit:{category:"currency",value:"万元"}
        },
        $value:"123456.00"
      }
    },
    landConstraints: {
      $meta: {
        $desc: { cn: "土地限定条件", en: "soil number" },
        $attributes: {
          type: "group-ref", macro: { code: 'CHILDREN_CONDITIONS([{"tags":"block-fragment"}])', },
        },
      },
      totalNum: {
        $desc: { cn: "地块数" },
        $attributes: {
          type: "number-int", macro: { code: 'CHILDREN_COUNT_CONDITIONS([{""tags":"block-fragment"}])' },
        }
      },
      totalArea: {
        $meta: {
          $desc: { cn: "总用地面积" },
          $attributes: {
            type: "number", macro: { code: 'SIBLING_SUM_CONDITIONS(["tags":"block-fragment', },
          }
        }
      },
      blocks: {
        $meta: {
          $atrributes: {
            type: "group-template", macro: { code: 'CHILDREN()', template: "landConstraints/blocks/no1" }
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


  public async getRaw(propPath?: string): Promise<any> {
    var self = this;
    const imodel: object = IModel.iModel;
    var obj = imodel;
    var doGet = async function (): Promise<any> {
      if (!propPath) {

        return imodel;

      } else {
        if (!self.hasLoaded(propPath)) {
          if (!self.hasCached(propPath)) {
            await self.getByHttp(propPath).then(function (obj) {

            }, function (reason) {
              throw reason;
            });
          } else {
            await self.getFromCache(propPath).then(function (obj) {

            }, function (reason) {
              throw reason;
            });

          }

        }

        var paths: string[] = propPath.split('/');
        for (let i = 0; i < paths.length; i++) {
          if (obj.hasOwnProperty(paths[i])) {
            obj = obj[paths[i]];
          } else {
            var reason = {};
            throw (reason);
          }
        }
      }
      return obj;
    };
    return doGet();
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

  at(propPath?: string, locale?: string): Promise<any> {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.getRaw(propPath).then(
        async function (obj) {
          if (!obj.$meta.$value && obj.$meta.$attributes && obj.$meta.$attributes.macro) {
            await self.compile(obj)
          }
          resolve(obj.$meta);
        }, function (reason) {
          reject(reason);
        }
      );
    });


  };

  async  compile(obj: any): Promise<any> {
    const self = this;
    var macro: any = obj.$meta.$attributes.macro;
    var dependencies = macro.dependencies || [];
    macro['status'] = "resolving";

    await self.loadDependencies(dependencies).then(function () {
      macro['status'] = "resolved";
    }, function (reason) {
      macro['status'] = 'erro';
    });

    Object.defineProperty(obj.meta, "$value", {
      get: function () {
        return self.execMacro(obj.$meta.$attributes.macro, obj);
      }
    });


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
        dependenciesLoad.push(self.getRaw(dependencies[i]));
    }
    return Promise.all(dependenciesLoad);

  };

  execMacro(code: string, context: any): any {

    if (context.$meta.$atrributes.macro.status === 'resolved') {
      var command;
      switch (command) {
        case "REFERENCE":
      }

    }


  };
};