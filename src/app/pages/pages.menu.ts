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
        path: 'rules',
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
            path: 'goverment',
            data: {
              menu: {
                title: 'general.government',
              }
            }
          },
          {
            path: 'group',
            data: {
              menu: {
                title: 'general.group',
              }
            }
          },
          {
            path: 'custom',
            data: {
              menu: {
                title: 'general.custom',
              }
            }
          },
        ]
      },
      {
        path: 'planMgr',
        data: {
          menu: {
            title: 'project.project_planMgr',
            icon: 'ion-edit',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        // children: [
        //   {
        //     path: 'ckeditor',
        //     data: {
        //       menu: {
        //         title: 'general.menu.ck_editor',
        //       }
        //     }
        //   }
        // ]
      },
      {
        path: 'operatorMgr',
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
            path: 'scheduleMgr',
            data: {
              menu: {
                title: 'project.project_scheduleMgr',
              }
            }
          },
          {
            path: 'adminMgr',
            data: {
              menu: {
                title:'project.project_adminMgr',
              }
            }
          },
          {
            path: 'departmentMgr',
            data: {
              menu: {
                title: 'project.project_departmentMgr',
              }
            }
          },
         
        ]
      },
      {
        path: 'docMgr',
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
            path: 'category',
            data: {
              menu: {
                title: 'general.category',
              }
            }
          },
             
        ]
      },
      {
        path: 'setup',
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
            path: 'costSetup',
            data: {
              menu: {
                title: 'parameters.parameters_cost',
              }
            }
          },
          {
            path: 'designSetup',
            data: {
              menu: {
                title: 'parameters.parameters_design',
              }
            }
          },
         
        ]
      },
      // {
      //   path: 'forms',
      //   data: {
      //     menu: {
      //       title: 'general.menu.form_elements',
      //       icon: 'ion-compose',
      //       selected: false,
      //       expanded: false,
      //       order: 400,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'inputs',
      //       data: {
      //         menu: {
      //           title: 'general.menu.form_inputs',
      //         }
      //       }
      //     },
      //     {
      //       path: 'layouts',
      //       data: {
      //         menu: {
      //           title: 'general.menu.form_layouts',
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: 'tables',
      //   data: {
      //     menu: {
      //       title: 'general.menu.tables',
      //       icon: 'ion-grid',
      //       selected: false,
      //       expanded: false,
      //       order: 500,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'basictables',
      //       data: {
      //         menu: {
      //           title: 'general.menu.basic_tables',
      //         }
      //       }
      //     },
      //     {
      //       path: 'smarttables',
      //       data: {
      //         menu: {
      //           title: 'general.menu.smart_tables',
      //         }
      //       }
      //     },
      //     {
      //       path: 'datatables',
      //       data: {
      //         menu: {
      //           title: 'Data Tables',
      //         }
      //       }
      //     },
      //      {
      //        path: 'hottables',
      //        data: {
      //          menu: {
      //            title: 'Hot Tables',
      //          }
      //        }
      //      }
      //   ]
      // },
      // {
      //   path: 'maps',
      //   data: {
      //     menu: {
      //       title: 'general.menu.maps',
      //       icon: 'ion-ios-location-outline',
      //       selected: false,
      //       expanded: false,
      //       order: 600,
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'googlemaps',
      //       data: {
      //         menu: {
      //           title: 'general.menu.google_maps',
      //         }
      //       }
      //     },
      //     {
      //       path: 'leafletmaps',
      //       data: {
      //         menu: {
      //           title: 'general.menu.leaflet_maps',
      //         }
      //       }
      //     },
      //     {
      //       path: 'bubblemaps',
      //       data: {
      //         menu: {
      //           title: 'general.menu.bubble_maps',
      //         }
      //       }
      //     },
      //     {
      //       path: 'linemaps',
      //       data: {
      //         menu: {
      //           title: 'general.menu.line_maps',
      //         }
      //       }
      //     }
      //   ]
      // },
     
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'general.menu.menu_level_1',
      //       icon: 'ion-ios-more',
      //       selected: false,
      //       expanded: false,
      //       order: 700,
      //     }
      //   },
      //   children: [
      //     {
      //       path: '',
      //       data: {
      //         menu: {
      //           title: 'general.menu.menu_level_1_1',
      //           url: '#'
      //         }
      //       }
      //     },
      //     {
      //       path: '',
      //       data: {
      //         menu: {
      //           title: 'general.menu.menu_level_1_2',
      //           url: '#'
      //         }
      //       },
      //       children: [
      //         {
      //           path: '',
      //           data: {
      //             menu: {
      //               title: 'general.menu.menu_level_1_2_1',
      //               url: '#'
      //             }
      //           }
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'general.menu.external_link',
      //       url: 'http://akveo.com',
      //       icon: 'ion-android-exit',
      //       order: 800,
      //       target: '_blank'
      //     }
      //   }
      // }
    ]
  }
];
