import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  
  {
    title: true,
    name: 'Main Menu',
    permission: '',
  },
 
  {
    name: 'Clerk Menu',
    url: '/clerk-view/clerk-dashboard',
    icon: 'fa fa-users',
    permission: 'DATA_CLERK'
  },
  {
    name: 'Validator Menu',
    url: '/validator-view/analytics',
    icon: 'fa fa-users',
    permission: 'DATA_ANALYST'
  },
  {
    name: 'ADMIN',
    url: '/administration/staff-registration',
    icon: 'fa fa-users',
    permission: 'DATA_DEPARTMENT_HEAD',
  },
  {
    name: 'Profile',
    url: '/profile',
    icon: 'fa fa-street-view',
    permission: '',
  }
  



  

  
  // {
  //   name: 'Logout',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
];
