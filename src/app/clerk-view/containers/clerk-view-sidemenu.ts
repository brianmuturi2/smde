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
    permission: 'can_view_device_explorer_menu',
    
    children: [
      {
        name: 'Analytics',
        url: '/clerk-view/clerk-dashboard',
        icon: 'fa fa-line-chart',
        permission: 'can_add_business_accounts'
      },
      {
        name: 'Upload Document',
        url: '/clerk-view/upload-file',
        icon: 'fa fa-cloud-upload',
        permission: 'can_add_business_accounts'
      },
      {
        name: 'My Documents',
        url: '/clerk-view/my-document',
        icon: 'fa fa-hand-lizard-o',
        permission: 'can_add_business_accounts'
      },
      {
        name: 'Pending Documents',
        url: '/clerk-view/pending-validation',
        icon: 'fa fa-exchange',
        permission: 'can_add_business_accounts'
      },
      {
        name: 'Approved',
        url: '/clerk-view/approved-documents',
        icon: 'fa fa-check-square',
        permission: 'can_add_business_accounts'
      },
      {
        name: 'Rejected',
        url: '/clerk-view/rejected-documents',
        icon: 'fa fa-times',
        permission: 'can_add_business_accounts'
      }
    ]
  },
  {
    name: 'My Profile',
    url: '/profile',
    icon: 'fa fa-street-view'
  }

  

  


  
];
