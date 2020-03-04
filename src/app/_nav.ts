import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  
  {
    title: true,
    name: 'Main Menu'
  },
  
  {
    name: 'Clerk Dashboard',
    url: '/surveyofkenya/clerk-dashboard',
    icon: 'fa fa-home'
  },
  {
    name: 'Upload Document',
    url: '/surveyofkenya/upload-file',
    icon: 'fa fa-cloud-upload'
  },
  {
    name: 'My Documents',
    url: '/surveyofkenya/my-document',
    icon: 'fa fa-book'
  },
  {
    name: 'Pending Documents',
    url: '/surveyofkenya/pending-validation',
    icon: 'fa fa-battery-1'
  },
  {
    name: 'Approved',
    url: '/surveyofkenya/approved',
    icon: 'fa fa-check-square-o'
  },
  {
    name: 'Rejected Document',
    url: '/surveyofkenya/rejected',
    icon: 'fa fa-window-close'
  },
  {
    name: 'Administrative',
    url: '/administration/staff-registration',
    icon: 'fa fa-window-close'
  },

  
  // {
  //   name: 'Logout',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
];
