export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'iModelEditor',
        data: {
          menu: {
            title: 'project.project_constraint_rules',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 50
          }
        },
         children: [
          {
            path: 'rules.goverment',
            data: {
              menu: {
                title: 'general.government',
              }
            }
          },
          {
            path: 'rules.group',
            data: {
              menu: {
                title: 'general.group',
              }
            }
          },
          {
            path: 'rules.custom',
            data: {
              menu: {
                title: 'general.custom',
              }
            }
          },
        ]
      },
      {
        path: 'iModelEditor',
        data: {
          menu: {
            title: 'project.project_planMgr',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
         children: [
          {
            path: 'plans',
            data: {
              menu: {
                title: 'general.government',
              }
            }
          },]
        
      },
      {
        path: 'iModelEditor',
        data: {
          menu: {
            title: 'project.project_operatorMgr',
            icon: 'ion-gear-a',
            selected: false,
            expanded: false,
            order: 250,
          }
        },
         children: [
          {
            path: 'operatorMgr.scheduleMgr',
            data: {
              menu: {
                title: 'project.project_scheduleMgr',
              }
            }
          },
          {
            path: 'operatorMgr.adminMgr',
            data: {
              menu: {
                title:'project.project_adminMgr',
              }
            }
          },
          {
            path: 'operatorMgr.departmentMgr',
            data: {
              menu: {
                title: 'project.project_departmentMgr',
              }
            }
          },
         
        ]
      },
      {
        path: 'iModelEditor',
        data: {
          menu: {
            title: 'project.project_docmentMgr',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
        children: [
          {
            path: 'docMgr.category',
            data: {
              menu: {
                title: 'general.category',
              }
            }
          },
             
        ]
      },
      {
        path: 'iModelEditor',
        data: {
          menu: {
            title: 'project.project_dev_parameters',
            icon: 'ion-android-laptop',
            selected: false,
            expanded: false,
            order: 300,
          }
        },
        children: [
          {
            path: 'setup.costSetup',
            data: {
              menu: {
                title: 'parameters.parameters_cost',
              }
            }
          },
          {
            path: 'setup.designSetup',
            data: {
              menu: {
                title: 'parameters.parameters_design',
              }
            }
          },
         
        ]
      },
      
    
    ]
  }
];
