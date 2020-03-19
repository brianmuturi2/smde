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
      name: 'System Administration'
    },
    
    
    {
      name: 'User Management',
      url: '/',
      icon: 'fa fa-group',
      permission: 'can_view_device_explorer_menu',
      
      children: [
        {
          name: 'Staff Listing',
          url: '/administration/staff-listing',
          icon: 'fa fa-users',
          permission: 'can_add_business_accounts'
        },
        {
          name: 'New Staff',
          url: '/administration/staff-registration',
          icon: 'fa fa-user-plus',
          permission: 'can_add_business_accounts'
        }
      ]
    },
    {
      name: 'Document Manager',
      url: '/',
      icon: 'fa fa-suitcase',
      permission: 'can_view_device_explorer_menu',
      
      children: [
        {
          name: 'Document Listing',
          url: '/document-manager/document-listing',
          icon: 'fa fa-hdd-o',
          permission: 'can_add_business_accounts'
        },
        {
          name: 'Revoked Documents',
          url: '/document-manager/revoked-documents',
          icon: 'fa fa-exclamation-triangle',
          permission: 'can_add_business_accounts'
        }
      ]
    },
    
  
  
    
  ];
  