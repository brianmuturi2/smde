import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  
  {
    title: true,
    name: 'Main Menu'
  },
 
  {
    name: 'Clerk Menu',
    url: '/clerk-view/clerk-dashboard',
    icon: 'fa fa-window-close'
  },
  {
    name: 'Validator Menu',
    url: '/validator-view/analytics',
    icon: 'fa fa-window-close'
  },
  {
    name: 'ADMIN',
    url: '/administration/staff-registration',
    icon: 'fa fa-window-close'
  },
  {
    name: 'Profile',
    url: '/profile',
    icon: 'fa fa-street-view'
  }
  



  

  
  // {
  //   name: 'Logout',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
];
