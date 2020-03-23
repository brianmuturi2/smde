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
    name: 'Validator Menu'
  },
  {
    name: 'Document',
    url: '/',
    icon: 'fa fa-suitcase',
    permission: 'can_view_device_explorer_menu',
    
    children: [
      {
        name: 'Analytics',
        url: '/validator-view/analytics',
        icon: 'fa fa-line-chart',
        permission: 'can_add_business_accounts'
      },
      {
        name: 'Validate Document',
        url: '/validator-view/pending-documents',
        icon: 'fa fa-gavel',
        permission: 'can_add_business_accounts'
      },
      {
        name: 'Approved Docs',
        url: '/validator-view/approved-documents',
        icon: 'fa fa-check-square',
        permission: 'can_add_business_accounts'
      },
      {
        name: 'Rejected Docs',
        url: '/validator-view/rejected-documents',
        icon: 'fa fa-times',
        permission: 'can_add_business_accounts'
      },
      {
        name: 'Resubmitted Docs',
        url: '/validator-view/rejected-documents',
        icon: 'fa fa-reply',
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
