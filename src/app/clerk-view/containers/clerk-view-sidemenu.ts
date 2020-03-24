interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  permission?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    title: true,
    name: 'Clerk Menu'
  },
  {
    name: 'Document',
    url: '/',
    icon: 'fa fa-suitcase',
 
    
    children: [
      {
        name: 'Analytics',
        url: '/clerk-view/clerk-dashboard',
        icon: 'fa fa-line-chart',
        permission: 'DATA_CLERK'
      },
      {
        name: 'Upload Document',
        url: '/clerk-view/upload-file',
        icon: 'fa fa-cloud-upload',
        permission: 'DATA_CLERK'
      },
      {
        name: 'My Documents',
        url: '/clerk-view/my-document',
        icon: 'fa fa-hand-lizard-o',
        permission: 'DATA_CLERK'
      },
      {
        name: 'Pending Documents',
        url: '/clerk-view/pending-validation',
        icon: 'fa fa-exchange',
        permission: 'DATA_CLERK'
      },
      {
        name: 'Approved',
        url: '/clerk-view/approved-documents',
        icon: 'fa fa-check-square',
        permission: 'DATA_CLERK'
      },
      {
        name: 'Rejected',
        url: '/clerk-view/rejected-documents',
        icon: 'fa fa-times',
        permission: 'DATA_CLERK'
      }
    ]
  },
  {
    name: 'My Profile',
    url: '/profile',
    icon: 'fa fa-street-view'
  }

  

  


  
];
